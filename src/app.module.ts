import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app-config/app-config.module';
import { TypeOrmConfigService } from 'src/config/external-config/typeorm-config.service';
import { AuthModule } from './apis/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './apis/students/students.module';
import { SchoolsModule } from './apis/schools/schools.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    StudentsModule,
    SchoolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
