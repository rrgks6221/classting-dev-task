import { StudentEntity } from 'src/entities/student.entity';

export class StudentResponseDto {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(studentEntity: Partial<StudentEntity> = {}) {
    Object.assign(this, studentEntity);
  }
}
