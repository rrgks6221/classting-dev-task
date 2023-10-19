import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { SchoolPageNewsEntity } from 'src/entities/school-news.entity';
import { SchoolPageEntity } from 'src/entities/school-page.entity';

export class SchoolPageNewsResponseDto
  extends BaseResponseDto
  implements
    Pick<
      SchoolPageNewsEntity,
      'id' | 'schoolPageId' | 'studentId' | 'title' | 'description'
    >
{
  @ApiProperty({
    description: '학교 페이지 고유 ID',
    format: 'integer',
  })
  schoolPageId: number;

  @ApiProperty({
    description: '학생 고유 ID',
    format: 'integer',
  })
  studentId: number;

  @ApiProperty({
    description: '학교 페이지 뉴스 제목',
  })
  title: string;

  @ApiProperty({
    description: '학교 페이지 뉴스 내용',
  })
  description: string;

  constructor(schoolPage: Partial<SchoolPageEntity> = {}) {
    super();

    Object.assign(this, schoolPage);
  }
}
