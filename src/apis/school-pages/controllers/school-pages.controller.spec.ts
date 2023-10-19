import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPageType } from 'src/apis/school-pages/constants/school-page.enum';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { FindAllSchoolPageNewsRequestQueryDto } from 'src/apis/school-pages/dto/find-all-school-page-news-request-query.dto';
import { FindAllSchoolPageRequestQueryDto } from 'src/apis/school-pages/dto/find-all-school-page-request-query.dto';
import { PartialUpdateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/partial-update-school-page-news-request-body.dto';
import { StudentEntity } from 'src/entities/student.entity';
import { MockSchoolPagesService } from 'test/mock/mock.service';
import { SchoolPagesService } from '../school-pages.service';
import { SchoolPagesController } from './school-pages.controller';

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

  describe(SchoolPagesController.prototype.findAllAndCount.name, () => {
    let student: StudentEntity;
    let findAllSchoolPageRequestQueryDto: FindAllSchoolPageRequestQueryDto;

    beforeEach(() => {
      student = new StudentEntity();
      findAllSchoolPageRequestQueryDto = new FindAllSchoolPageRequestQueryDto();
    });

    it('전체 조회 성공', async () => {
      student.id = 1;
      findAllSchoolPageRequestQueryDto.type = SchoolPageType.Elementary;

      const schoolPages = [
        {
          id: 2,
          type: SchoolPageType.Elementary,
        },
      ];

      schoolPagesService.findAllAndCount.mockResolvedValue([schoolPages, 1]);

      await expect(
        controller.findAllAndCount(student, findAllSchoolPageRequestQueryDto),
      ).resolves.toEqual({
        schoolPages,
        totalCount: 1,
      });
    });
  });

  describe(SchoolPagesController.prototype.findOne.name, () => {
    let schoolPageId: number;

    beforeEach(() => {
      schoolPageId = NaN;
    });

    it('단일 조회 성공', async () => {
      schoolPageId = 1;

      const schoolPage = {
        id: 2,
      };

      schoolPagesService.findOneOrNotFound.mockResolvedValue(schoolPage);

      await expect(controller.findOne(schoolPageId)).resolves.toEqual({
        schoolPage,
      });
    });
  });

  describe(SchoolPagesService.prototype.subscribe.name, () => {
    let student: StudentEntity;
    let schoolPageId: number;

    beforeEach(() => {
      student = new StudentEntity();
      schoolPageId = NaN;
    });

    it('학교 페이지 구독 성공', async () => {
      schoolPagesService.subscribe.mockResolvedValue(undefined);

      await expect(
        controller.subscribe(student, schoolPageId),
      ).resolves.toBeUndefined();
    });
  });

  describe(SchoolPagesService.prototype.unsubscribe.name, () => {
    let student: StudentEntity;
    let schoolPageId: number;

    beforeEach(() => {
      student = new StudentEntity();
      schoolPageId = NaN;
    });

    it('학교 페이지 구독 취소 성공', async () => {
      schoolPagesService.unsubscribe.mockResolvedValue(undefined);

      await expect(
        controller.unsubscribe(student, schoolPageId),
      ).resolves.toBeUndefined();
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

  describe(SchoolPagesController.prototype.findAllAndCountNews.name, () => {
    let schoolPageId: number;
    let findAllSchoolPageNewsRequestQueryDto: FindAllSchoolPageNewsRequestQueryDto;

    beforeEach(() => {
      schoolPageId = NaN;
      findAllSchoolPageNewsRequestQueryDto =
        new FindAllSchoolPageRequestQueryDto();
    });

    it('뉴스 전체 조회 성공', async () => {
      schoolPageId = 1;

      const newsList = [
        {
          id: 1,
        },
      ];

      schoolPagesService.findAllAndCountNews.mockResolvedValue([newsList, 1]);

      await expect(
        controller.findAllAndCountNews(
          schoolPageId,
          findAllSchoolPageNewsRequestQueryDto,
        ),
      ).resolves.toEqual({
        schoolPageNewsList: newsList,
        totalCount: 1,
      });
    });
  });

  describe(SchoolPagesService.prototype.partialUpdateNews.name, () => {
    let student: StudentEntity;
    let schoolPageId: number;
    let newsId: number;
    let partialUpdateSchoolPageNewsRequestBodyDto: PartialUpdateSchoolPageNewsRequestBodyDto;

    beforeEach(() => {
      student = new StudentEntity();
      schoolPageId = NaN;
      newsId = NaN;
      partialUpdateSchoolPageNewsRequestBodyDto =
        new PartialUpdateSchoolPageNewsRequestBodyDto();
    });

    it('뉴스 수정 성공', async () => {
      student.id = 1;
      schoolPageId = 2;
      partialUpdateSchoolPageNewsRequestBodyDto.title = 'updated title';

      const newSchoolPageNews = {
        id: 3,
        title: 'title',
        description: 'description',
      };

      schoolPagesService.partialUpdateNews.mockResolvedValue(newSchoolPageNews);

      await expect(
        controller.partialUpdateNews(
          student,
          schoolPageId,
          newsId,
          partialUpdateSchoolPageNewsRequestBodyDto,
        ),
      ).resolves.toEqual({
        schoolPageNews: newSchoolPageNews,
      });
    });
  });

  describe(SchoolPagesService.prototype.removeNews.name, () => {
    let student: StudentEntity;
    let schoolPageId: number;
    let newsId: number;

    beforeEach(() => {
      student = new StudentEntity();
      schoolPageId = NaN;
      newsId = NaN;
    });

    it('뉴스 수정 성공', async () => {
      schoolPagesService.removeNews.mockResolvedValue(undefined);

      await expect(
        controller.removeNews(student, schoolPageId, newsId),
      ).resolves.toBeUndefined();
    });
  });
});
