import { Injectable } from '@nestjs/common';
import { CreateSchoolRequestBodyDto } from './dto/create-school-request-body.dto';

@Injectable()
export class SchoolsService {
  create(createSchoolRequestBodyDto: CreateSchoolRequestBodyDto) {
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
