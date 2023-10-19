import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { transformPage } from 'src/common/transformers/page.transform';
import { DEFAULT_PAGE_SIZE } from 'src/constants/common.constant';

export class PageDto {
  @ApiPropertyOptional({
    description: '페이지번호',
    type: 'number',
    format: 'integer',
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Transform(transformPage)
  page = 0;

  @ApiPropertyOptional({
    description: '페이지당 아이템 수',
    type: 'number',
    format: 'integer',
    default: DEFAULT_PAGE_SIZE,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize = DEFAULT_PAGE_SIZE;
}
