import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@zen/prisma';
import { Configurator } from 'libs/config/src';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new Configurator(app).unified({
    swagger: {
      title: 'Sandbox',
      description:
        'Demonstrates monorepo powered by NestJS, Dapr, Prisma and Docker for Autonomous Services(Micro too)',
    },
  });

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
