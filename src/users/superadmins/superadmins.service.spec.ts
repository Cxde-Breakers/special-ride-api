import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminsService } from './superadmins.service';

describe('SuperadminsService', () => {
  let service: SuperadminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminsService],
    }).compile();

    service = module.get<SuperadminsService>(SuperadminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
