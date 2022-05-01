import { Test, TestingModule } from '@nestjs/testing';
import { PiracyController } from './piracy.controller';
import { PiracyService } from './piracy.service';

describe('PiracyController', () => {
  let piracyController: PiracyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PiracyController],
      providers: [PiracyService],
    }).compile();

    piracyController = app.get<PiracyController>(PiracyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(piracyController.getHello()).toBe('Hello World!');
    });
  });
});
