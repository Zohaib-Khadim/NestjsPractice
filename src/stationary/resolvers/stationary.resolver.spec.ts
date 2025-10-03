import { Test, TestingModule } from '@nestjs/testing';
import { StationaryResolver } from './stationary.resolver';

describe('StationaryResolver', () => {
  let resolver: StationaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationaryResolver],
    }).compile();

    resolver = module.get<StationaryResolver>(StationaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
