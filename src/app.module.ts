import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app-config/app-config.module';
import { TypeOrmConfigService } from 'src/config/external-config/typeorm-config.service';
import { AuthModule } from './apis/auth/auth.module';
import { SchoolPagesModule } from './apis/school-pages/school-pages.module';
import { StudentsModule } from './apis/students/students.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    StudentsModule,
    SchoolPagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
