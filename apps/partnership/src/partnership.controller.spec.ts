import { Test, TestingModule } from '@nestjs/testing';
import { PartnershipController } from './partnership.controller';
import { PartnershipService } from './partnership.service';

describe('PartnershipController', () => {
  let partnershipController: PartnershipController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PartnershipController],
      providers: [PartnershipService],
    }).compile();

    partnershipController = app.get<PartnershipController>(PartnershipController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(partnershipController.getHello()).toBe('Hello World!');
    });
  });
});
