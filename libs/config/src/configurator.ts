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
  private readonly port: string;
  private readonly env: string;
  private readonly _app: string;

  constructor(private readonly app: INestApplication) {
    const config = app.get(ConfigService);
    this.port = config.get('PORT', '3000');
    this.env = config.get('NODE_ENV', 'development');
    this._app = config.get('APP_NAME', 'app');
  }

  private addSwagger(config: SwaggerOptions) {
    if (!config) {
      return;
    }
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
    Logger.log('Swagger initialized', Configurator.name);
  }

  private addCors() {
    this.app.enableCors();
  }

  private addCompression() {
    this.app.use(compression());
    Logger.log('Compression initialized', Configurator.name);
  }

  private addHelmet() {
    this.app.use(helmet());
    Logger.log('Helmet initialized', Configurator.name);
  }

  private addSerialization() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    Logger.log('Serialization initialized', Configurator.name);
  }

  private addCloudEvents() {
    this.app.use(
      json({ type: ['application/json', 'application/cloudevents+json'] }),
    );
    Logger.log('Cloud Events initialized', Configurator.name);
  }

  private async addPrisma() {
    const prisma: PrismaService = await this.app
      .resolve(PrismaService)
      .catch(() => null);

    if (prisma) {
      await prisma.enableShutdownHooks(this.app);
      Logger.log('Prisma initialized', Configurator.name);
    }
  }

  private async addDapr() {
    const dapr: DaprService = await this.app
      .resolve(DaprService)
      .catch(() => null);

    if (dapr && (dapr as any)._subscriptions.length > 0) {
      this.addCloudEvents();
    }
    Logger.log('Dapr initialized', Configurator.name);
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
  async unified(config?: UnifiedConfigOptions): Promise<{
    port: string | number;
    env: string;
    app: string;
  }> {
    const { swagger } = config || {};

    Promise.resolve()
      .then(() => this.addCompression())
      .then(() => this.addCors())
      .then(() => this.addHelmet())
      .then(() => this.addSerialization())
      .then(() => this.addSwagger(swagger))
      .then(() => this.addPrisma())
      .then(() => this.addDapr());

    return {
      app: this._app,
      env: this.env,
      port: this.port,
    };
  }
}
