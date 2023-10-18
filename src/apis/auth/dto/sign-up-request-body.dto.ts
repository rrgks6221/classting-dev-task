import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpRequestBodyDto {
  @ApiProperty({
    description: '이름',
    minLength: 3,
    maxLength: 10,
  })
  @Length(3, 10)
  @IsString()
  name: string;

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
