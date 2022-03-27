import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Configurator } from '@zen/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const env = config.get('NODE_ENV', 'development');

  new Configurator(app).unified({
    swagger: {
      title: 'Sandbox',
      description: 'Playground API for quick tests',
      version: `v1-${env}`,
    },
  });

  const port = config.get('PORT', '3000');
  await app.listen(port);
}
bootstrap();
