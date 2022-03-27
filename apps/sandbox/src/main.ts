import { NestFactory } from '@nestjs/core';
import { Configurator } from '@zen/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port } = await new Configurator(app).unified({
    swagger: {
      title: 'Sandbox',
      description: 'Playground API for quick tests',
    },
  });

  await app.listen(port);
}
bootstrap();
