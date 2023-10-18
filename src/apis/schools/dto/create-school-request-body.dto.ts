import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUrl, Length } from 'class-validator';
import { SchoolType } from 'src/constants/school/school.enum';
import { SchoolEntity } from 'src/entities/school.entity';

export class CreateSchoolRequestBodyDto
  implements
    Pick<
      SchoolEntity,
      'name' | 'type' | 'address' | 'detailAddress' | 'websiteUrl'
    >
{
  @ApiProperty({
    description: '학교 이름',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: '학교 타입',
    enum: SchoolType,
  })
  @IsEnum(SchoolType)
  type: SchoolType;

  @ApiProperty({
    description: '주소',
    example: '서울특별시 강남구',
  })
  address: string;

  @ApiProperty({
    description: '상세 주소',
    example: '테헤란로 503, 5층',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @Length(3, 255)
  detailAddress: string;

  @ApiProperty({
    description: '학교 웹사이트 주소',
    example: 'https://classting.com',
    format: 'url',
  })
  @IsString()
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  websiteUrl: string;
}