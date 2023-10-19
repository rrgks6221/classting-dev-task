import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Student } from 'src/apis/auth/decorators/student.decorator';
import { JwtAuthGuard } from 'src/apis/auth/guards/jwt-auth.guard';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { PartialUpdateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/partial-update-school-page-news-request-body.dto';
import { SchoolPageNewsResponseDto } from 'src/apis/school-pages/dto/school-page-news-response.dto';
import { SchoolPageResponseDto } from 'src/apis/school-pages/dto/school-page-response.dto';
import {
  ApiSchoolPageCreate,
  ApiSchoolPageCreateNews,
  ApiSchoolPagePartialUpdateNews,
  ApiSchoolPageRemoveNews,
  ApiSchoolPageSubscribe,
  ApiSchoolPageUnsubscribe,
} from 'src/apis/school-pages/school-pages.controller.swagger';
import { SchoolPagesService } from 'src/apis/school-pages/school-pages.service';
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';
import { StudentEntity } from 'src/entities/student.entity';

@ApiTags('school page')
@Controller('api/school-pages')
export class SchoolPagesController {
  constructor(private readonly schoolPagesService: SchoolPagesService) {}

  /**
   * 처음 학교 페이지를 만든 유저가 관리자가 되는것으로 가정한다.
   */
  @ApiSchoolPageCreate({
    summary: '학교 페이지 생성',
    description: '학교 페이지 생성한 학생이 최초 관리자로 가정한다.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Student() student: StudentEntity,
    @Body() createSchoolPageRequestBodyDto: CreateSchoolPageRequestBodyDto,
  ) {
    const newSchoolPage = await this.schoolPagesService.create(
      student.id,
      createSchoolPageRequestBodyDto,
    );

    return {
      schoolPage: new SchoolPageResponseDto(newSchoolPage),
    };
  }

  @ApiSchoolPageSubscribe({ summary: '학교 페이지 구독' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':schoolPageId/subscribe')
  subscribe(
    @Student() student: StudentEntity,
    @Param('schoolPageId', ParsePositiveIntPipe) schoolPageId: number,
  ): Promise<void> {
    return this.schoolPagesService.subscribe(student.id, schoolPageId);
  }

  @ApiSchoolPageUnsubscribe({ summary: '학교 페이지 구독 취소' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':schoolPageId/subscribe')
  unsubscribe(
    @Student() student: StudentEntity,
    @Param('schoolPageId', ParsePositiveIntPipe) schoolPageId: number,
  ): Promise<void> {
    return this.schoolPagesService.unsubscribe(student.id, schoolPageId);
  }

  @ApiSchoolPageCreateNews({ summary: '학교 뉴스 생성' })
  @UseGuards(JwtAuthGuard)
  @Post(':schoolPageId/news')
  async createNews(
    @Student() student: StudentEntity,
    @Param('schoolPageId', ParsePositiveIntPipe) schoolPageId: number,
    @Body()
    createSchoolPageNewRequestBodyDto: CreateSchoolPageNewsRequestBodyDto,
  ) {
    await this.schoolPagesService.findOneOrNotFound({
      id: schoolPageId,
    });

    await this.schoolPagesService.findOneSchoolPageAdminOrForbidden(
      student.id,
      schoolPageId,
    );

    const newSchoolPageNews = await this.schoolPagesService.createNews(
      student.id,
      schoolPageId,
      createSchoolPageNewRequestBodyDto,
    );

    return {
      schoolPageNews: new SchoolPageNewsResponseDto(newSchoolPageNews),
    };
  }

  @ApiSchoolPagePartialUpdateNews({ summary: '학교 페이지 뉴스 업데이트' })
  @UseGuards(JwtAuthGuard)
  @Patch(':schoolPageId/news/:newsId')
  async partialUpdateNews(
    @Student() student: StudentEntity,
    @Param('schoolPageId', ParsePositiveIntPipe) schoolPageId: number,
    @Param('newsId', ParsePositiveIntPipe) newsId: number,
    @Body()
    partialUpdateSchoolPageNewsRequestBodyDto: PartialUpdateSchoolPageNewsRequestBodyDto,
  ) {
    await this.schoolPagesService.findOneOrNotFound({
      id: schoolPageId,
    });

    await this.schoolPagesService.findOneSchoolPageAdminOrForbidden(
      student.id,
      schoolPageId,
    );

    const newSchoolPageNews = await this.schoolPagesService.partialUpdateNews(
      newsId,
      partialUpdateSchoolPageNewsRequestBodyDto,
    );

    return {
      schoolPageNews: new SchoolPageNewsResponseDto(newSchoolPageNews),
    };
  }

  @ApiSchoolPageRemoveNews({ summary: '학교 뉴스 삭제' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':schoolPageId/news/:newsId')
  async removeNews(
    @Student() student: StudentEntity,
    @Param('schoolPageId', ParsePositiveIntPipe) schoolPageId: number,
    @Param('newsId', ParsePositiveIntPipe) newsId: number,
  ) {
    await this.schoolPagesService.findOneOrNotFound({
      id: schoolPageId,
    });

    await this.schoolPagesService.findOneSchoolPageAdminOrForbidden(
      student.id,
      schoolPageId,
    );

    return this.schoolPagesService.removeNews(newsId);
  }
}
