import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpRequestBodyDto {
  @Length(3, 10)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
