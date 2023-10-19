import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { PageDto } from 'src/common/dto/page.dto';
import { SortBy } from 'src/constants/common.enum';
import { SchoolPageEntity } from 'src/entities/school-page.entity';

export class FindAllSchoolPageNewsRequestQueryDto extends PageDto {
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
