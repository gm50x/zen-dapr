import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@zen/prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
