import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { StudentsService } from 'src/apis/students/students.service';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentsService,
    @Inject(ENCRYPTION_TOKEN) private readonly encryption: typeof bcrypt,
  ) {}

  async signUp(signUpRequestBodyDto: SignUpRequestBodyDto) {
    signUpRequestBodyDto.password = await this.encryption.hash(
      signUpRequestBodyDto.password,
      10,
    );

    return this.studentsService.create(signUpRequestBodyDto);
  }
}
