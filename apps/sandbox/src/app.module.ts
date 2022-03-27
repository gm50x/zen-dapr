import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DaprModule } from '@zen/dapr';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DaprModule],
  controllers: [SandboxController],
  providers: [SandboxService],
})
export class AppModule {}
