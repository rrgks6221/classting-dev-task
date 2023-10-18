import { StudentEntity } from 'src/entities/student.entity';

export class CreateStudentDto
  implements Pick<StudentEntity, 'name' | 'email' | 'password'>
{
  name: string;
  email: string;
  password: string;
}
