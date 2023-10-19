import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { StudentEntity } from 'src/apis/students/entities/student.entity';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';
import { StudentsService } from './services/students.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [
    StudentsService,
    {
      provide: ENCRYPTION_TOKEN,
      useValue: bcrypt,
    },
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
