import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { SchoolType } from 'src/constants/school/school.enum';
import { SchoolPageEntity } from 'src/entities/school-page.entity';

export class SchoolPageResponseDto
  extends BaseResponseDto
  implements
    Pick<
      SchoolPageEntity,
      'id' | 'name' | 'type' | 'address' | 'detailAddress' | 'websiteUrl'
    >
{
  @ApiProperty({
    description: '학교 이름',
  })
  name: string;

  @ApiProperty({
    description: '학교 타입',
    enum: SchoolType,
  })
  type: SchoolType;

  @ApiProperty({
    description: '학교 주소',
    example: '서울특별시 강남구',
  })
  address: string;

  @ApiProperty({
    description: '학교 상세 주소',
    example: '테헤란로 503, 5층',
  })
  detailAddress: string;

  @ApiProperty({
    description: '학교 웹사이트 주소',
    example: 'https://classting.com',
    format: 'url',
  })
  websiteUrl: string;

  constructor(schoolPage: Partial<SchoolPageEntity> = {}) {
    super();

    Object.assign(this, schoolPage);
  }
}
