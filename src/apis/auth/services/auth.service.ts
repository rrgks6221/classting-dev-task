import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { SignInRequestBodyDto } from 'src/apis/auth/dto/sign-in-request-body.dto';
import { SignUpRequestBodyDto } from 'src/apis/auth/dto/sign-up-request-body.dto';
import { StudentsService } from 'src/apis/students/services/students.service';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly jwtService: JwtService,
    @Inject(ENCRYPTION_TOKEN) private readonly encryption: typeof bcrypt,
  ) {}

  async signUp(signUpRequestBodyDto: SignUpRequestBodyDto) {
    signUpRequestBodyDto.password = await this.encryption.hash(
      signUpRequestBodyDto.password,
      10,
    );

    return this.studentsService.create(signUpRequestBodyDto);
  }

  async signIn(signInRequestBodyDto: SignInRequestBodyDto) {
    const existStudent = await this.studentsService.findOneBy({
      email: signInRequestBodyDto.email,
    });

    if (!existStudent) {
      throw new UnauthorizedException('로그인 정보가 일치하지 않습니다.');
    }

    const isComparePassword = await this.encryption.compare(
      signInRequestBodyDto.password,
      existStudent.password,
    );

    if (!isComparePassword) {
      throw new ForbiddenException('로그인 정보가 일치하지 않습니다.');
    }

    return existStudent;
  }

  generateAccessToken(id: number): Promise<string> {
    return this.jwtService.signAsync({
      id,
    });
  }
}
