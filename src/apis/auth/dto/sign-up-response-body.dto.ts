import { StudentEntity } from 'src/entities/student.entity';

export class SignUpResponseBodyDto {
  student: StudentEntity;

  authToken: string;
}
