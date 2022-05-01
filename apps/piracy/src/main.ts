import { NestFactory } from '@nestjs/core';
import { PiracyModule } from './piracy.module';

async function bootstrap() {
  const app = await NestFactory.create(PiracyModule);
  await app.listen(3000);
}
bootstrap();
