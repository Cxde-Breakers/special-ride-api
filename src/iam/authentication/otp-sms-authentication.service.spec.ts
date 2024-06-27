import { Test, TestingModule } from '@nestjs/testing';
import { OtpSmsAuthenticationService } from './otp-sms-authentication.service';

describe('OtpSmsAuthenticationService', () => {
  let service: OtpSmsAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpSmsAuthenticationService],
    }).compile();

    service = module.get<OtpSmsAuthenticationService>(OtpSmsAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
