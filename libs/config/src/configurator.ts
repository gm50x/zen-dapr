import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { json } from 'express';
import { PrismaService } from '@zen/prisma';
import { ConfigService } from '@nestjs/config';
import { DaprService } from '@zen/dapr';

type BearerAuthType = 'http' | 'apiKey' | 'oauth2' | 'openIdConnect';
type BearerOptions = {
  name: string;
  type?: BearerAuthType;
};

type SwaggerOptions = {
  title: string;
  description: string;
  version?: string;
  bearer?: BearerOptions | Array<BearerOptions>;
};

type UnifiedConfigOptions = {
  swagger?: SwaggerOptions;
};

export class Configurator {
  public readonly port: string;
  public readonly env: string;

  constructor(private readonly app: INestApplication) {
    const config = app.get(ConfigService);
    this.port = config.get('PORT', '3000');
    this.env = config.get('NODE_ENV', 'development');
  }

  private async addSwagger(config: SwaggerOptions) {
    const { title, description, version = 'v1', bearer: _bearer } = config;
    const configService = this.app.get(ConfigService);
    const env = configService.get('NODE_ENV', 'development');
    const documentBuilder = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(`${version}-${env}`)
      .setExternalDoc('Export Specs', '/docs-json');

    const bearers: Array<BearerOptions> = [];
    if (_bearer) {
      if (!Array.isArray(_bearer)) {
        bearers.push(_bearer);
      } else {
        bearers.push(..._bearer);
      }
    }

    for (const bearer of bearers) {
      const { name, type = 'http' } = bearer;
      documentBuilder.addBearerAuth({ type }, name);
    }

    const swaggerDocument = documentBuilder.build();
    const document = SwaggerModule.createDocument(this.app, swaggerDocument);
    SwaggerModule.setup('docs', this.app, document);
  }

  private async addCors() {
    this.app.enableCors();
  }

  private async addCompression() {
    this.app.use(compression());
  }

  private async addHelmet() {
    this.app.use(helmet());
  }

  private async addSerialization() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
  }

  private async addCloudEvents() {
    this.app.use(
      json({ type: ['application/json', 'application/cloudevents+json'] }),
    );
  }

  /**
   * Unified configuration for API Projects:
   * - adds compression
   * - adds cors
   * - adds helmet
   * - adds transformation
   * - optionally adds swagger
   * - optionally adds application/cloudevents+json
   */
  async unified(config?: UnifiedConfigOptions): Promise<Configurator> {
    const { swagger } = config || {};

    await this.addCompression();
    await this.addCors();
    await this.addHelmet();
    await this.addSerialization();

    if (swagger) {
      this.addSwagger(swagger);
    }

    const prisma: PrismaService = await this.app
      .resolve(PrismaService)
      .catch(() => null);

    if (prisma) {
      await prisma.enableShutdownHooks(this.app);
      Logger.log('Enabled shutdown hooks for Prisma', Configurator.name);
    }

    const dapr: DaprService = await this.app
      .resolve(DaprService)
      .catch(() => null);

    if (dapr && dapr.getSubscriptions().length > 0) {
      this.addCloudEvents();
    }

    return this;
  }
}
