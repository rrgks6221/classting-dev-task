import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { SchoolPageType } from 'src/apis/school-pages/constants/school-page.enum';
import { SchoolPageEntity } from 'src/apis/school-pages/entities/school-page.entity';
import { PageDto } from 'src/common/dto/page.dto';
import { transformStringBoolean } from 'src/common/transformers/stringBoolean.transform';
import { SortBy } from 'src/constants/common.enum';

export class FindAllSchoolPageRequestQueryDto extends PageDto {
  @ApiPropertyOptional({
    description: '구독 중 필터링',
    enum: ['true', 'false'],
    default: false,
  })
  @IsOptional()
  @Transform(transformStringBoolean)
  isSubscribe = false;

  @ApiPropertyOptional({
    description: '학교 타입 필터링',
    enum: SchoolPageType,
  })
  @IsOptional()
  @IsEnum(SchoolPageType)
  type?: SchoolPageType;

  @ApiPropertyOptional({
    description: '정렬 기준',
    enum: ['id', 'type', 'createdAt'],
    default: 'id',
  })
  @IsIn(['id', 'type', 'createdAt'])
  @IsOptional()
  sortBy: keyof Pick<SchoolPageEntity, 'id' | 'type' | 'createdAt'> = 'id';

  @ApiPropertyOptional({
    description: '정렬 방법 (ASC: 오름차순, DESC: 내림차순)',
    enum: SortBy,
    default: SortBy.Asc,
  })
  @IsIn([SortBy.Asc, SortBy.Desc])
  @IsOptional()
  orderBy: SortBy = SortBy.Asc;
}
