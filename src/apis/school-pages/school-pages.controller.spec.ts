import { Test, TestingModule } from '@nestjs/testing';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { StudentEntity } from 'src/entities/student.entity';
import { MockSchoolPagesService } from 'test/mock/mock.service';
import { SchoolPagesController } from './school-pages.controller';
import { SchoolPagesService } from './school-pages.service';

describe(SchoolPagesController.name, () => {
  let controller: SchoolPagesController;
  let schoolPagesService: MockSchoolPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPagesController],
      providers: [
        {
          provide: SchoolPagesService,
          useClass: MockSchoolPagesService,
        },
      ],
    }).compile();

    controller = module.get<SchoolPagesController>(SchoolPagesController);
    schoolPagesService = module.get<MockSchoolPagesService>(SchoolPagesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(SchoolPagesController.prototype.create.name, () => {
    let student: StudentEntity;
    let createSchoolPageRequestBodyDto: CreateSchoolPageRequestBodyDto;

    beforeEach(() => {
      student = new StudentEntity();
      createSchoolPageRequestBodyDto = new CreateSchoolPageRequestBodyDto();
    });

    it('학교 페이지 생성 성공', async () => {
      student.id = 1;
      createSchoolPageRequestBodyDto.name = 'name';

      schoolPagesService.create.mockResolvedValue({
        id: 2,
        name: 'name',
      });

      await expect(
        controller.create(student, createSchoolPageRequestBodyDto),
      ).resolves.toEqual({
        schoolPage: {
          id: 2,
          name: 'name',
        },
      });
    });
  });

  describe(SchoolPagesService.prototype.createNews.name, () => {
    let student: StudentEntity;
    let schoolPageId: number;
    let createSchoolPageNewRequestBodyDto: CreateSchoolPageNewsRequestBodyDto;

    beforeEach(() => {
      student = new StudentEntity();
      schoolPageId = NaN;
      createSchoolPageNewRequestBodyDto =
        new CreateSchoolPageNewsRequestBodyDto();
    });

    it('뉴스 생성 성공', async () => {
      student.id = 1;
      schoolPageId = 2;
      createSchoolPageNewRequestBodyDto.title = 'title';

      const newSchoolPageNews = {
        id: 3,
        title: 'title',
        description: 'description',
      };

      schoolPagesService.createNews.mockResolvedValue(newSchoolPageNews);

      await expect(
        controller.createNews(
          student,
          schoolPageId,
          createSchoolPageNewRequestBodyDto,
        ),
      ).resolves.toEqual({
        schoolPageNews: newSchoolPageNews,
      });
    });
  });
});
