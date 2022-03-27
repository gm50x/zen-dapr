import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as CORS from 'cors';
import * as compression from 'compression';
import helmet from 'helmet';
import { json } from 'express';
import { PrismaService } from '@zen/prisma';
import { ConfigService } from '@nestjs/config';

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
  enablePrisma: boolean;
  swagger?: SwaggerOptions;
  enableCloudEvents?: boolean;
};

export class Configurator {
  public readonly port: string;
  public readonly env: string;

  constructor(private readonly app: INestApplication) {
    const config = app.get(ConfigService);
    this.port = config.get('PORT', '3000');
    this.env = config.get('NODE_ENV', 'development');
  }

  addSwagger(config: SwaggerOptions): Configurator {
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

    return this;
  }

  addCors(): Configurator {
    this.app.use(CORS());
    return this;
  }

  addCompression(): Configurator {
    this.app.use(compression());
    return this;
  }

  addHelmet(): Configurator {
    this.app.use(helmet());
    return this;
  }

  addSerialization(): Configurator {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    return this;
  }

  addCloudEvents(): Configurator {
    this.app.use(
      json({ type: ['application/json', 'application/cloudevents+json'] }),
    );
    return this;
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
  unified(config: UnifiedConfigOptions): Configurator {
    const { enablePrisma, swagger, enableCloudEvents } = config || {
      enablePrisma: false,
    };
    this.addCompression().addCors().addHelmet().addSerialization();

    if (swagger) {
      this.addSwagger(swagger);
    }
    if (enableCloudEvents) {
      this.addCloudEvents();
    }

    if (enablePrisma) {
      const prisma = this.app.get(PrismaService);
      prisma.enableShutdownHooks(this.app);
    }

    return this;
  }
}
