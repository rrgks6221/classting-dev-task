import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { CreateSchoolRequestBodyDto } from './dto/create-school-request-body.dto';
import { SchoolsService } from './schools.service';

@Controller('api/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Body() createSchoolRequestBodyDto: CreateSchoolRequestBodyDto) {
    return this.schoolsService.create(createSchoolRequestBodyDto);
  }

  @Post()
  createNews() {
    return this.schoolsService.createNews();
  }

  @Patch()
  partialUpdateNews() {
    return this.schoolsService.partialUpdateNews();
  }

  @Delete()
  removeNews() {
    return this.schoolsService.removeNews();
  }
}
