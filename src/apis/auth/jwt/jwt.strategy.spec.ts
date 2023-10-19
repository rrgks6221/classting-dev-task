import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from 'src/apis/auth/jwt/jwt.strategy';
import { StudentsService } from 'src/apis/students/services/students.service';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { MockStudentsService } from 'test/mock/mock.service';

describe(JwtStrategy.name, () => {
  let jwtStrategy: JwtStrategy;
  let studentsService: MockStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AppConfigService,
          useValue: {
            get: () => 'secret_key',
          },
        },
        {
          provide: StudentsService,
          useClass: MockStudentsService,
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    studentsService = module.get<MockStudentsService>(StudentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(jwtStrategy);
  });

  describe(JwtStrategy.prototype.validate.name, () => {
    let payload: any;

    beforeEach(() => {
      payload = {};
    });

    it('student 가 있는 경우', async () => {
      payload.id = 1;

      studentsService.findOneBy.mockResolvedValue({ id: 1 });

      await expect(jwtStrategy.validate(payload)).resolves.toEqual({ id: 1 });
    });

    it('student 가 없는 경우', async () => {
      payload.id = 1;

      studentsService.findOneBy.mockResolvedValue(null);

      await expect(jwtStrategy.validate(payload)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
