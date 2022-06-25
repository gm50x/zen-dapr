import { NestFactory } from '@nestjs/core';
import { Configurator } from 'libs/config/src';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = await new Configurator(app).unified({
    swagger: {
      title: 'Sandbox',
      description:
        'Demonstrates monorepo powered by NestJS, Dapr, Prisma and Docker for Autonomous Services(Micro too)',
    },
  });

  await app.listen(port);
}
bootstrap();
