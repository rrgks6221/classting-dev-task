import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { PageDto } from 'src/common/dto/page.dto';
import { transformStringBoolean } from 'src/common/transformers/stringBoolean.transform';
import { SortBy } from 'src/constants/common.enum';
import { SchoolType } from 'src/constants/school/school.enum';
import { SchoolPageEntity } from 'src/entities/school-page.entity';

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
    enum: SchoolType,
  })
  @IsOptional()
  @IsEnum(SchoolType)
  type?: SchoolType;

  @ApiPropertyOptional({
    description: '정렬 기준',
    enum: ['id', 'type', 'createdAt'],
    default: 'true',
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
