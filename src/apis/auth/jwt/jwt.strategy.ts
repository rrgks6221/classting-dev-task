import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StudentsService } from 'src/apis/students/services/students.service';
import { ENV_KEY } from 'src/config/app-config/app-config.constant';
import { AppConfigService } from 'src/config/app-config/app-config.service';

interface Payload {
  id: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly studentService: StudentsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.get<string>(ENV_KEY.JWT_SECRET),
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const student = await this.studentService.findOneBy({ id: payload.id });

    if (!student) {
      throw new UnauthorizedException('invalid token');
    }

    return student;
  }
}
