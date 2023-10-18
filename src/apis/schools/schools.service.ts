import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolsService {
  create(createSchoolDto: CreateSchoolDto) {
    return 'This action adds a new school';
  }

  createNews() {
    return;
  }

  partialUpdateNews() {
    return;
  }

  removeNews() {
    return;
  }
}
