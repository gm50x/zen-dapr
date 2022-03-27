import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [SandboxController],
  providers: [SandboxService],
})
export class AppModule {}
