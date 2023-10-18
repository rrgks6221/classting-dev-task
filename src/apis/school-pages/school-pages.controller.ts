import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { SchoolPagesService } from 'src/apis/school-pages/school-pages.service';

@Controller('api/school-pages')
export class SchoolPagesController {
  constructor(private readonly schoolPagesService: SchoolPagesService) {}

  @Post()
  create(
    @Body() createSchoolPageRequestBodyDto: CreateSchoolPageRequestBodyDto,
  ) {
    return this.schoolPagesService.create(createSchoolPageRequestBodyDto);
  }

  @Post(':schoolPageId/news')
  createNews() {
    return this.schoolPagesService.createNews();
  }

  @Patch(':schoolPageId/news/:newsId')
  partialUpdateNews() {
    return this.schoolPagesService.partialUpdateNews();
  }

  @Delete(':schoolPageId/news/:newsId')
  removeNews() {
    return this.schoolPagesService.removeNews();
  }
}
