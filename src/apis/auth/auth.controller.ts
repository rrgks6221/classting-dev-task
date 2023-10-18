import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpRequestBodyDto: SignUpRequestBodyDto) {
    return this.authService.signUp(signUpRequestBodyDto);
  }
}
