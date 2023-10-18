import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { StudentsService } from 'src/apis/students/students.service';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';
import { MockStudentsService } from 'test/mock/mock.service';
import { AuthService } from './auth.service';

describe(AuthService.name, () => {
  let service: AuthService;
  let studentsService: MockStudentsService;
  let jwtService: { signAsync: jest.Mock };
  let encryption: { hash: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: StudentsService,
          useClass: MockStudentsService,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: ENCRYPTION_TOKEN,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    studentsService = module.get<MockStudentsService>(StudentsService);
    jwtService = module.get<{ signAsync: jest.Mock }>(JwtService);
    encryption = module.get<{ hash: jest.Mock }>(ENCRYPTION_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(AuthService.prototype.signUp.name, () => {
    let signUpRequestBodyDto: SignUpRequestBodyDto;

    beforeEach(() => {
      signUpRequestBodyDto = new SignUpRequestBodyDto();
    });

    it('회원가입 성공', async () => {
      const password = 'password';
      const hashedPassword = 'hashedPassword';
      signUpRequestBodyDto.password = password;

      encryption.hash.mockResolvedValue(hashedPassword);
      studentsService.create.mockResolvedValue(signUpRequestBodyDto);

      await expect(service.signUp(signUpRequestBodyDto)).resolves.toEqual({
        password: 'hashedPassword',
      });
      expect(encryption.hash).toBeCalledWith(password, expect.anything());
    });
  });

  describe(AuthService.prototype.generateAccessToken.name, () => {
    let id: number;

    it('토큰 생성 성공', async () => {
      id = 1;

      await expect(service.generateAccessToken(id)).resolves;
      expect(jwtService.signAsync).toBeCalledWith({ id });
    });
  });
});
