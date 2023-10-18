import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequestBodyDto {
  @ApiProperty({
    description: '이메일',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
  })
  @IsString()
  password: string;
}
