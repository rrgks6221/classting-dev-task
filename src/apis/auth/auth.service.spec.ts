import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { StudentsService } from 'src/apis/students/students.service';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';
import { MockStudentsService } from 'test/mock/mock.service';
import { AuthService } from './auth.service';

describe(AuthService.name, () => {
  let service: AuthService;
  let studentsService: MockStudentsService;
  let jwtService: { signAsync: jest.Mock };
  let encryption: { hash: jest.Mock; compare: jest.Mock };

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
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    studentsService = module.get<MockStudentsService>(StudentsService);
    jwtService = module.get<{ signAsync: jest.Mock }>(JwtService);
    encryption = module.get<{ hash: jest.Mock; compare: jest.Mock }>(
      ENCRYPTION_TOKEN,
    );
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

  describe(AuthService.prototype.signIn.name, () => {
    let signInRequestBodyDto: SignInRequestBodyDto;

    beforeEach(() => {
      signInRequestBodyDto = new SignInRequestBodyDto();
    });

    it('email 에 해당하는 학생이 존재하지 않는 경우', async () => {
      signInRequestBodyDto.email = 'notExistEmail';

      studentsService.findOneBy.mockResolvedValue(null);

      await expect(service.signIn(signInRequestBodyDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('password 가 틀린 경우', async () => {
      const email = 'existEmail';
      signInRequestBodyDto.email = email;

      studentsService.findOneBy.mockResolvedValue({
        email,
      });
      encryption.compare.mockResolvedValue(false);

      await expect(service.signIn(signInRequestBodyDto)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('로그인 성공', async () => {
      const email = 'existEmail';
      signInRequestBodyDto.email = email;

      studentsService.findOneBy.mockResolvedValue({
        email,
      });
      encryption.compare.mockResolvedValue(true);

      await expect(service.signIn(signInRequestBodyDto)).resolves.toEqual({
        email,
      });
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
