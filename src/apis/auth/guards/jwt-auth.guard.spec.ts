import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/apis/auth/guards/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    jwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });
});
