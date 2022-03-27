import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Configurator } from '@zen/config';
import { PrismaService } from '@zen/prisma';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = app.get(PrismaService);
  const config = app.get(ConfigService);
  const env = config.get('NODE_ENV', 'development');
  const port = config.get('PORT', '3000');

  prisma.enableShutdownHooks(app);

  new Configurator(app).unified({
    swagger: {
      title: 'Sandbox',
      description: 'Playground API for quick tests',
      version: `v1-${env}`,
    },
  });

  await app.listen(port);
}
bootstrap();
