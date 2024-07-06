import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminsController } from './superadmins.controller';
import { SuperadminsService } from './superadmins.service';

describe('SuperadminsController', () => {
  let controller: SuperadminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminsController],
      providers: [SuperadminsService],
    }).compile();

    controller = module.get<SuperadminsController>(SuperadminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
