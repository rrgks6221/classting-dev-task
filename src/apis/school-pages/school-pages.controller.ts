import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Student } from 'src/apis/auth/decorators/student.decorator';
import { JwtAuthGuard } from 'src/apis/auth/guards/jwt-auth.guard';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { SchoolPageResponseDto } from 'src/apis/school-pages/dto/school-page-response.dto';
import { ApiSchoolPageCreate } from 'src/apis/school-pages/school-pages.controller.swagger';
import { SchoolPagesService } from 'src/apis/school-pages/school-pages.service';
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

  @Post(':schoolPageId/news')
  createNews() {
    return this.schoolPagesService.createNews();
  }

  @Patch(':schoolPageId/news/:newsId')
  partialUpdateNews() {
    return this.schoolPagesService.partialUpdateNews();
  }

  @Delete(':schoolPageId/news/:newsId')
  removeNews() {
    return this.schoolPagesService.removeNews();
  }
}
