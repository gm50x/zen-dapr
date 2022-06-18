import { Module } from '@nestjs/common';
import { SecretsProviderModule } from '@zen/secrets-provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SecretsProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
