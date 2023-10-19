import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';

export class PartialUpdateSchoolPageNewsRequestBodyDto
  implements Partial<CreateSchoolPageNewsRequestBodyDto>
{
  @ApiPropertyOptional({
    description: '제목',
    minLength: 1,
    maxLength: 255,
  })
  @Length(1, 255)
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: '내용',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
