import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolsService } from './schools.service';

@Controller('api/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
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
