import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SchoolPageResponseDto } from 'src/apis/school-pages/dto/school-page-response.dto';

export const ApiSchoolPageCreate = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(SchoolPageResponseDto),
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.CREATED,
      schema: {
        properties: {
          schoolPage: {
            type: 'object',
            $ref: getSchemaPath(SchoolPageResponseDto),
          },
        },
      },
    }),
  );
};
