import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { StudentResponseDto } from 'src/apis/students/dto/student-response.dto';

export const ApiSignUp = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(StudentResponseDto),
    ApiOperation(apiOptions),
    ApiResponse({
      status: HttpStatus.CREATED,
      schema: {
        properties: {
          student: {
            type: 'object',
            $ref: getSchemaPath(StudentResponseDto),
          },
          accessToken: {
            type: 'string',
            description: 'authorization token',
          },
        },
      },
    }),
  );
};

export const ApiSignIn = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(StudentResponseDto),
    ApiOperation(apiOptions),
    ApiResponse({
      status: HttpStatus.CREATED,
      schema: {
        properties: {
          student: {
            type: 'object',
            $ref: getSchemaPath(StudentResponseDto),
          },
          accessToken: {
            type: 'string',
            description: 'authorization token',
          },
        },
      },
    }),
  );
};
