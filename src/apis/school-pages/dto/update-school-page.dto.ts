import { PartialType } from '@nestjs/swagger';
import { CreateSchoolPageRequestBodyDto } from './create-school-page-request-body.dto';

export class UpdateSchoolPageDto extends PartialType(
  CreateSchoolPageRequestBodyDto,
) {}
