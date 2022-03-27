import { Test, TestingModule } from '@nestjs/testing';
import { DaprService } from './dapr.service';

describe('DaprService', () => {
  let service: DaprService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaprService],
    }).compile();

    service = module.get<DaprService>(DaprService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
