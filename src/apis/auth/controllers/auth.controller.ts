import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiGetProfile,
  ApiSignIn,
  ApiSignUp,
} from 'src/apis/auth/controllers/auth.controller.swagger';
import { Student } from 'src/apis/auth/decorators/student.decorator';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { JwtAuthGuard } from 'src/apis/auth/guards/jwt-auth.guard';
import { StudentResponseDto } from 'src/apis/students/dto/student-response.dto';
import { StudentEntity } from 'src/apis/students/entities/student.entity';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiGetProfile({ summary: '로그인한 학생 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Student() student: StudentEntity) {
    return {
      student: new StudentResponseDto(student),
    };
  }

  @ApiSignUp({ summary: '회원가입' })
  @Post('sign-up')
  async signUp(@Body() signUpRequestBodyDto: SignUpRequestBodyDto) {
    const newStudent = await this.authService.signUp(signUpRequestBodyDto);
    const accessToken = await this.authService.generateAccessToken(
      newStudent.id,
    );

    return {
      accessToken,
      student: new StudentResponseDto(newStudent),
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
      student: new StudentResponseDto(student),
    };
  }
}
