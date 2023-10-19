import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import bcrypt from 'bcrypt';
import { JwtStrategy } from 'src/apis/auth/jwt/jwt.strategy';
import { StudentsModule } from 'src/apis/students/students.module';
import { ENV_KEY } from 'src/config/app-config/app-config.constant';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    StudentsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return {
          secret: appConfigService.get<string>(ENV_KEY.JWT_SECRET),
        };
      },
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: ENCRYPTION_TOKEN,
      useValue: bcrypt,
    },
  ],
})
export class AuthModule {}
