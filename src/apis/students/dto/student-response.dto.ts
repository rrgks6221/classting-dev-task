import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { StudentEntity } from 'src/apis/students/entities/student.entity';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

export class StudentResponseDto
  extends BaseResponseDto
  implements
    Pick<
      StudentEntity,
      'id' | 'name' | 'email' | 'password' | 'createdAt' | 'updatedAt'
    >
{
  @ApiProperty({
    description: '학생 이름',
  })
  name: string;

  @ApiProperty({
    description: '학생 이메일',
  })
  email: string;

  @Exclude()
  password: string;

  constructor(student: Partial<StudentEntity> = {}) {
    super();

    Object.assign(this, student);
  }
}
