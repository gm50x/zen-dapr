import { Test, TestingModule } from '@nestjs/testing';
import { DavrService } from './davr.service';

describe('DavrService', () => {
  let service: DavrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DavrService],
    }).compile();

    service = module.get<DavrService>(DavrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
