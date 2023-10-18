import { Test, TestingModule } from '@nestjs/testing';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { StudentEntity } from 'src/entities/student.entity';
import { MockAuthService } from 'test/mock/mock.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe(AuthController.name, () => {
  let controller: AuthController;
  let authService: MockAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<MockAuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(AuthController.prototype.getProfile.name, () => {
    let student: StudentEntity;

    beforeEach(() => {
      student = new StudentEntity();
    });

    it('프로필 조회 성공', () => {
      student.id = 1;

      expect(controller.getProfile(student)).toEqual({ student });
    });
  });

  describe(AuthController.prototype.signUp.name, () => {
    let signUpRequestBodyDto: SignUpRequestBodyDto;

    beforeEach(() => {
      signUpRequestBodyDto = new SignUpRequestBodyDto();
    });

    it('회원가입 성공', async () => {
      const newStudent = { id: 1 };
      const accessToken = 'token';
      authService.signUp.mockResolvedValue(newStudent);
      authService.generateAccessToken.mockResolvedValue(accessToken);

      await expect(controller.signUp(signUpRequestBodyDto)).resolves.toEqual({
        accessToken,
        student: newStudent,
      });
      expect(authService.generateAccessToken).toBeCalledWith(newStudent.id);
    });
  });

  describe(AuthController.prototype.signIn.name, () => {
    let signInRequestBodyDto: SignInRequestBodyDto;

    beforeEach(() => {
      signInRequestBodyDto = new SignInRequestBodyDto();
    });

    it('회원가입 성공', async () => {
      const newStudent = { id: 1 };
      const accessToken = 'token';
      authService.signIn.mockResolvedValue(newStudent);
      authService.generateAccessToken.mockResolvedValue(accessToken);

      await expect(controller.signIn(signInRequestBodyDto)).resolves.toEqual({
        accessToken,
        student: newStudent,
      });
      expect(authService.generateAccessToken).toBeCalledWith(newStudent.id);
    });
  });
});
