import { NestFactory } from '@nestjs/core';
import { SandboxModule } from './sandbox.module';

async function bootstrap() {
  const app = await NestFactory.create(SandboxModule);
  await app.listen(3000);
}
bootstrap();
