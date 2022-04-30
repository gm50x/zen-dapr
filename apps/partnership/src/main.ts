import { NestFactory } from '@nestjs/core';
import { PartnershipModule } from './partnership.module';

async function bootstrap() {
  const app = await NestFactory.create(PartnershipModule);
  await app.listen(3000);
}
bootstrap();
