import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV_KEY } from 'src/config/app-config/app-config.constant';
import { AppConfigService } from 'src/config/app-config/app-config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.appConfigService.get<string>(ENV_KEY.DATABASE_HOST),
      port: this.appConfigService.get<number>(ENV_KEY.DATABASE_PORT),
      username: this.appConfigService.get<string>(ENV_KEY.DATABASE_USERNAME),
      password: this.appConfigService.get<string>(ENV_KEY.DATABASE_PASSWORD),
      database: this.appConfigService.get<string>(ENV_KEY.DATABASE_DATABASE),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: this.appConfigService.isLocal(),
    };
  }
}
