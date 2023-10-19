import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { SchoolPageNewsEntity } from 'src/entities/school-news.entity';

export class CreateSchoolPageNewsRequestBodyDto
  implements Pick<SchoolPageNewsEntity, 'title' | 'description'>
{
  @ApiProperty({
    description: '제목',
    minLength: 1,
    maxLength: 255,
  })
  @Length(1, 255)
  @IsString()
  title: string;

  @ApiProperty({
    description: '내용',
  })
  @IsString()
  description: string;
}
