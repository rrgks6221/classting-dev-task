import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SchoolPageNewsResponseDto } from 'src/apis/school-pages/dto/school-page-news-response.dto';
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

export const ApiSchoolPageFindAllAndCount = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(SchoolPageResponseDto),
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        properties: {
          schoolPages: {
            type: 'array',
            items: {
              type: 'object',
              $ref: getSchemaPath(SchoolPageResponseDto),
            },
          },
          totalCount: {
            type: 'number',
          },
        },
      },
    }),
  );
};

export const ApiSchoolPageFindOne = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(SchoolPageResponseDto),
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
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

export const ApiSchoolPageSubscribe = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
};

export const ApiSchoolPageUnsubscribe = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
};

export const ApiSchoolPageCreateNews = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(SchoolPageNewsResponseDto),
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.CREATED,
      schema: {
        properties: {
          schoolPage: {
            type: 'object',
            $ref: getSchemaPath(SchoolPageNewsResponseDto),
          },
        },
      },
    }),
  );
};

export const ApiSchoolPageFindAllAndCountNews = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(SchoolPageNewsResponseDto),
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        properties: {
          schoolPageNewsList: {
            type: 'array',
            items: {
              type: 'object',
              $ref: getSchemaPath(SchoolPageNewsResponseDto),
            },
          },
          totalCount: {
            type: 'number',
          },
        },
      },
    }),
  );
};

export const ApiSchoolPagePartialUpdateNews = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiExtraModels(SchoolPageNewsResponseDto),
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        properties: {
          schoolPage: {
            type: 'object',
            $ref: getSchemaPath(SchoolPageNewsResponseDto),
          },
        },
      },
    }),
  );
};

export const ApiSchoolPageRemoveNews = (
  apiOptions: Required<Pick<OperationObject, 'summary'>> &
    Partial<OperationObject>,
) => {
  return applyDecorators(
    ApiOperation(apiOptions),
    ApiBearerAuth(),
    ApiResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
};
