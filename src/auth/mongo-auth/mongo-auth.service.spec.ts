import { Test, TestingModule } from '@nestjs/testing';
import { MongoAuthService } from './mongo-auth.service';

describe('MongoAuthService', () => {
  let service: MongoAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoAuthService],
    }).compile();

    service = module.get<MongoAuthService>(MongoAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
