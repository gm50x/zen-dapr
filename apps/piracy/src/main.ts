import { NestFactory } from '@nestjs/core';
import { Configurator } from '@zen/config';
import { PiracyModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(PiracyModule);
  const { port } = await new Configurator(app).unified({
    swagger: {
      title: 'Piracy',
      description: 'Pirates and Pirate Ships',
    },
  });
  await app.listen(port);
}
bootstrap();
