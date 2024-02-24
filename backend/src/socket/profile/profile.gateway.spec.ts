import { Test, TestingModule } from '@nestjs/testing';
import { ProfileGateway } from './profile.gateway';

describe('ProfileGateway', () => {
  let gateway: ProfileGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileGateway],
    }).compile();

    gateway = module.get<ProfileGateway>(ProfileGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
