import { Test, TestingModule } from '@nestjs/testing';
import { DataVersioningService } from './data-versioning.service';

describe('DataVersioningService', () => {
  let service: DataVersioningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataVersioningService],
    }).compile();

    service = module.get<DataVersioningService>(DataVersioningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
