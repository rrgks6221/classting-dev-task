import { Injectable } from '@nestjs/common';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';

@Injectable()
export class SchoolPagesService {
  create(createSchoolPageRequestBodyDto: CreateSchoolPageRequestBodyDto) {
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
