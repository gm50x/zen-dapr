import { Test, TestingModule } from '@nestjs/testing';
import { SandboxController } from './sandbox.controller';
import { SandboxService } from './sandbox.service';

describe('SandboxController', () => {
  let sandboxController: SandboxController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SandboxController],
      providers: [SandboxService],
    }).compile();

    sandboxController = app.get<SandboxController>(SandboxController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sandboxController.getHello()).toBe('Hello World!');
    });
  });
});
