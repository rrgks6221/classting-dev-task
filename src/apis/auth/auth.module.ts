import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ENV_KEY } from 'src/config/app-config/app-config.constant';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
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
  providers: [AuthService],
})
export class AuthModule {}
