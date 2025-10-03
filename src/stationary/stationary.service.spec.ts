import { Test, TestingModule } from '@nestjs/testing';
import { StationaryService } from './stationary.service';

describe('StationaryService', () => {
  let service: StationaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationaryService],
    }).compile();

    service = module.get<StationaryService>(StationaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
