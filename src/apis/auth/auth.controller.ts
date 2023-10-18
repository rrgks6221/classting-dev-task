import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiSignIn, ApiSignUp } from 'src/apis/auth/auth.constroller.swagger';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiSignUp({ summary: '회원가입' })
  @Post('sign-up')
  async signUp(@Body() signUpRequestBodyDto: SignUpRequestBodyDto) {
    const newStudent = await this.authService.signUp(signUpRequestBodyDto);
    const accessToken = await this.authService.generateAccessToken(
      newStudent.id,
    );

    return {
      accessToken,
      student: newStudent,
    };
  }

  @ApiSignIn({ summary: '로그인' })
  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() signInRequestBodyDto: SignInRequestBodyDto) {
    const student = await this.authService.signIn(signInRequestBodyDto);
    const accessToken = await this.authService.generateAccessToken(student.id);

    return {
      accessToken,
      student,
    };
  }
}
