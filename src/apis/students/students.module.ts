import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';
import { StudentEntity } from 'src/entities/student.entity';
import { StudentsService } from './students.service';

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
