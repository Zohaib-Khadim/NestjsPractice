import { Test, TestingModule } from '@nestjs/testing';
import { MongoAuthController } from './mongo-auth.controller';

describe('MongoAuthController', () => {
  let controller: MongoAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoAuthController],
    }).compile();

    controller = module.get<MongoAuthController>(MongoAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
