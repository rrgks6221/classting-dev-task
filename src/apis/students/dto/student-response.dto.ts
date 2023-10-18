import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { StudentEntity } from 'src/entities/student.entity';

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
}
