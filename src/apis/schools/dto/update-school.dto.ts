import { PartialType } from '@nestjs/swagger';
import { CreateSchoolRequestBodyDto } from './create-school-request-body.dto';

export class UpdateSchoolDto extends PartialType(CreateSchoolRequestBodyDto) {}
