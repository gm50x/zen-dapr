import { Test, TestingModule } from '@nestjs/testing';
import { DataVersionService } from './data-version.service';

describe('DataVersionService', () => {
  let service: DataVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataVersionService],
    }).compile();

    service = module.get<DataVersionService>(DataVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
