import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { FindAllSchoolPageNewsRequestQueryDto } from 'src/apis/school-pages/dto/find-all-school-page-news-request-query.dto';
import { FindAllSchoolPageRequestQueryDto } from 'src/apis/school-pages/dto/find-all-school-page-request-query.dto';
import { PartialUpdateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/partial-update-school-page-news-request-body.dto';
import { SchoolPageNewsEntity } from 'src/apis/school-pages/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/apis/school-pages/entities/school-page-admin-link.entity';
import { SchoolPageSubscribeLinkEntity } from 'src/apis/school-pages/entities/school-page-subscribe-link.entity';
import { SchoolPageEntity } from 'src/apis/school-pages/entities/school-page.entity';
import {
  MockDataSource,
  MockSchoolPageAdminLinkRepository,
  MockSchoolPageNewsRepository,
  MockSchoolPageRepository,
  MockSchoolPageSubscribeLinkRepository,
} from 'test/mock/mock.repository';
import { DataSource } from 'typeorm';
import { SchoolPagesService } from '../school-pages.service';

describe(SchoolPagesService.name, () => {
  let service: SchoolPagesService;
  let dataSource: MockDataSource;
  let schoolPageRepository: MockSchoolPageRepository;
  let schoolPageAdminLinkRepository: MockSchoolPageAdminLinkRepository;
  let schoolPageNewsRepository: MockSchoolPageNewsRepository;
  let schoolPageSubscribeLinkRepository: MockSchoolPageSubscribeLinkRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolPagesService,
        {
          provide: DataSource,
          useClass: MockDataSource,
        },
        {
          provide: getRepositoryToken(SchoolPageEntity),
          useClass: MockSchoolPageRepository,
        },
        {
          provide: getRepositoryToken(SchoolPageAdminLinkEntity),
          useClass: MockSchoolPageAdminLinkRepository,
        },
        {
          provide: getRepositoryToken(SchoolPageNewsEntity),
          useClass: MockSchoolPageNewsRepository,
        },
        {
          provide: getRepositoryToken(SchoolPageSubscribeLinkEntity),
          useClass: MockSchoolPageSubscribeLinkRepository,
        },
      ],
    }).compile();

    service = module.get<SchoolPagesService>(SchoolPagesService);
    dataSource = module.get<MockDataSource>(DataSource);
    schoolPageRepository = module.get<MockSchoolPageRepository>(
      getRepositoryToken(SchoolPageEntity),
    );
    schoolPageAdminLinkRepository =
      module.get<MockSchoolPageAdminLinkRepository>(
        getRepositoryToken(SchoolPageAdminLinkEntity),
      );
    schoolPageNewsRepository = module.get<MockSchoolPageNewsRepository>(
      getRepositoryToken(SchoolPageNewsEntity),
    );
    schoolPageSubscribeLinkRepository =
      module.get<MockSchoolPageSubscribeLinkRepository>(
        getRepositoryToken(SchoolPageSubscribeLinkEntity),
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(SchoolPagesService.prototype.create.name, () => {
    let studentId: number;
    let createSchoolPageRequestBodyDto: CreateSchoolPageRequestBodyDto;

    beforeEach(() => {
      studentId = NaN;
      createSchoolPageRequestBodyDto = new CreateSchoolPageRequestBodyDto();
    });

    it('이미 존재하는 학교 페이지가 있는 경우', async () => {
      const schoolName = 'schoolName';
      const address = 'address';
      const detailAddress = 'detailAddress';

      studentId = 1;
      createSchoolPageRequestBodyDto.name = schoolName;
      createSchoolPageRequestBodyDto.address = address;
      createSchoolPageRequestBodyDto.detailAddress = detailAddress;

      schoolPageRepository.findOne.mockResolvedValue({
        address,
        detailAddress,
        id: 2,
        name: schoolName,
      });

      await expect(
        service.create(studentId, createSchoolPageRequestBodyDto),
      ).rejects.toThrowError(ConflictException);
    });

    it('이미 존재하는 학교 페이지가 있는 경우', async () => {
      const schoolName = 'schoolName';
      const address = 'address';
      const detailAddress = 'detailAddress';

      studentId = 1;
      createSchoolPageRequestBodyDto.name = schoolName;
      createSchoolPageRequestBodyDto.address = address;
      createSchoolPageRequestBodyDto.detailAddress = detailAddress;

      const newSchoolPage = {
        address,
        detailAddress,
        id: 2,
        name: schoolName + '2',
      };
      schoolPageRepository.findOne.mockResolvedValue(newSchoolPage);
      schoolPageRepository.create.mockReturnValue(newSchoolPage);

      await expect(
        service.create(studentId, createSchoolPageRequestBodyDto),
      ).resolves.toEqual({
        address,
        detailAddress,
        id: 2,
        name: schoolName + '2',
      });
    });
  });

  describe(SchoolPagesService.prototype.findAllAndCount.name, () => {
    let studentId: number;
    let findAllSchoolPageRequestQueryDto: FindAllSchoolPageRequestQueryDto;

    beforeEach(() => {
      studentId = NaN;
      findAllSchoolPageRequestQueryDto = new FindAllSchoolPageRequestQueryDto();
    });

    it('전체 리스트를 불러오는 경우', async () => {
      studentId = 1;
      findAllSchoolPageRequestQueryDto.isSubscribe = false;
      findAllSchoolPageRequestQueryDto.page = 0;
      findAllSchoolPageRequestQueryDto.pageSize = 20;

      const schoolPages = [
        {
          id: 2,
        },
      ];
      const totalCount = 1;

      schoolPageRepository.findAndCount.mockResolvedValue([
        schoolPages,
        totalCount,
      ]);

      await expect(
        service.findAllAndCount(studentId, findAllSchoolPageRequestQueryDto),
      ).resolves.toEqual([schoolPages, totalCount]);

      expect(schoolPageRepository.findAndCount).toBeCalledWith({
        where: {
          type: undefined,
        },
        order: { id: 'ASC' },
        skip: 0,
        take: 20,
      });
    });

    it('구독중인 리스트를 불러오는 경우', async () => {
      studentId = 1;
      findAllSchoolPageRequestQueryDto.isSubscribe = true;
      findAllSchoolPageRequestQueryDto.page = 0;
      findAllSchoolPageRequestQueryDto.pageSize = 20;

      const schoolPages = [
        {
          id: 2,
        },
      ];
      const totalCount = 1;

      schoolPageRepository.findAndCount.mockResolvedValue([
        schoolPages,
        totalCount,
      ]);

      await expect(
        service.findAllAndCount(studentId, findAllSchoolPageRequestQueryDto),
      ).resolves.toEqual([schoolPages, totalCount]);

      expect(schoolPageRepository.findAndCount).toBeCalledWith({
        where: {
          type: undefined,
          schoolPageSubscribeList: {
            studentId,
          },
        },
        order: { id: 'ASC' },
        skip: 0,
        take: 20,
      });
    });
  });

  describe(SchoolPagesService.prototype.findOneOrNotFound.name, () => {
    it('학교 페이지가 존재하지 않는 경우', async () => {
      schoolPageRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOneOrNotFound({ id: 1 })).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('학교 페이지가 존재하는 경우', async () => {
      schoolPageRepository.findOneBy.mockResolvedValue({ id: 1 });

      await expect(service.findOneOrNotFound({ id: 1 })).resolves.toEqual({
        id: 1,
      });
    });
  });

  describe(SchoolPagesService.prototype.subscribe.name, () => {
    let studentId: number;
    let schoolPageId: number;

    beforeEach(() => {
      studentId = NaN;
      schoolPageId = NaN;
    });

    it('이미 구독중인 경우', async () => {
      studentId = 1;
      schoolPageId = 2;

      schoolPageRepository.findOneBy.mockResolvedValue({ id: schoolPageId });
      schoolPageSubscribeLinkRepository.findOne.mockResolvedValue({ id: 3 });

      await expect(
        service.subscribe(studentId, schoolPageId),
      ).rejects.toThrowError(ConflictException);
    });

    it('구독중이 아니면 구독 성공', async () => {
      studentId = 1;
      schoolPageId = 2;

      schoolPageRepository.findOneBy.mockResolvedValue({ id: schoolPageId });
      schoolPageSubscribeLinkRepository.findOne.mockResolvedValue(null);

      await expect(
        service.subscribe(studentId, schoolPageId),
      ).resolves.toBeUndefined();
    });
  });

  describe(SchoolPagesService.prototype.unsubscribe.name, () => {
    let studentId: number;
    let schoolPageId: number;

    beforeEach(() => {
      studentId = NaN;
      schoolPageId = NaN;
    });

    it('구독중이 아닌 경우', async () => {
      studentId = 1;
      schoolPageId = 2;

      schoolPageRepository.findOneBy.mockResolvedValue({ id: schoolPageId });
      schoolPageSubscribeLinkRepository.findOne.mockResolvedValue(null);

      await expect(
        service.unsubscribe(studentId, schoolPageId),
      ).rejects.toThrowError(ConflictException);
    });

    it('구독중이라면 구독 취소 성공', async () => {
      studentId = 1;
      schoolPageId = 2;

      schoolPageRepository.findOneBy.mockResolvedValue({ id: schoolPageId });
      schoolPageSubscribeLinkRepository.findOne.mockResolvedValue({ id: 3 });

      await expect(
        service.unsubscribe(studentId, schoolPageId),
      ).resolves.toBeUndefined();
    });
  });

  describe(
    SchoolPagesService.prototype.findOneSchoolPageAdminOrForbidden.name,
    () => {
      let studentId: number;
      let schoolPageId: number;

      beforeEach(() => {
        studentId = NaN;
        schoolPageId = NaN;
      });

      it('학교 페이지가 관리자가 아닌 경우', async () => {
        studentId = 1;
        schoolPageId = 2;

        schoolPageAdminLinkRepository.findOneBy.mockResolvedValue(null);

        await expect(
          service.findOneSchoolPageAdminOrForbidden(studentId, schoolPageId),
        ).rejects.toThrowError(ForbiddenException);
      });

      it('학교 페이지가 관리자인 경우', async () => {
        studentId = 1;
        schoolPageId = 2;

        const existSchoolPageAdminLink = {
          studentId,
          schoolPageId,
        };

        schoolPageAdminLinkRepository.findOneBy.mockResolvedValue(
          existSchoolPageAdminLink,
        );

        await expect(
          service.findOneSchoolPageAdminOrForbidden(studentId, schoolPageId),
        ).resolves.toEqual(existSchoolPageAdminLink);
      });
    },
  );

  describe(SchoolPagesService.prototype.createNews.name, () => {
    let studentId: number;
    let schoolPageId: number;
    let createSchoolPageNewRequestBodyDto: CreateSchoolPageNewsRequestBodyDto;

    beforeEach(() => {
      studentId = NaN;
      schoolPageId = NaN;
      createSchoolPageNewRequestBodyDto =
        new CreateSchoolPageNewsRequestBodyDto();
    });

    it('뉴스 생성 성공', async () => {
      studentId = 1;
      schoolPageId = 2;
      createSchoolPageNewRequestBodyDto.title = 'title';

      const newSchoolPageNews = {
        studentId,
        schoolPageId,
        ...createSchoolPageNewRequestBodyDto,
      };

      schoolPageNewsRepository.create.mockReturnValue(newSchoolPageNews);

      await expect(
        service.createNews(
          studentId,
          schoolPageId,
          createSchoolPageNewRequestBodyDto,
        ),
      ).resolves.toEqual(newSchoolPageNews);
    });
  });

  describe(SchoolPagesService.prototype.findAllAndCountNews.name, () => {
    let schoolPageId: number;
    let findAllSchoolPageNewsRequestQueryDto: FindAllSchoolPageNewsRequestQueryDto;

    beforeEach(() => {
      schoolPageId = NaN;
      findAllSchoolPageNewsRequestQueryDto =
        new FindAllSchoolPageRequestQueryDto();
    });

    it('전체 조회 성공', async () => {
      schoolPageId = 1;
      findAllSchoolPageNewsRequestQueryDto.page = 0;
      findAllSchoolPageNewsRequestQueryDto.pageSize = 20;

      const newsList = [
        {
          id: 1,
        },
      ];
      const totalCount = 1;

      schoolPageNewsRepository.findAndCount.mockResolvedValue([
        newsList,
        totalCount,
      ]);

      await expect(
        service.findAllAndCountNews(
          schoolPageId,
          findAllSchoolPageNewsRequestQueryDto,
        ),
      ).resolves.toEqual([newsList, totalCount]);

      expect(schoolPageNewsRepository.findAndCount).toBeCalledWith({
        where: {
          schoolPageId,
        },
        order: { id: 'ASC' },
        skip: 0,
        take: 20,
      });
    });
  });

  describe(SchoolPagesService.prototype.findOneNewsOrNotFound.name, () => {
    let newsId: number;

    beforeEach(() => {
      newsId = NaN;
    });

    it('뉴스가 존재하지 않는 경우', async () => {
      newsId = 1;

      schoolPageNewsRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOneNewsOrNotFound(newsId)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('뉴스가 존재하는 경우', async () => {
      newsId = 1;

      schoolPageNewsRepository.findOneBy.mockResolvedValue({ id: newsId });

      await expect(service.findOneNewsOrNotFound(newsId)).resolves.toEqual({
        id: newsId,
      });
    });
  });

  describe(SchoolPagesService.prototype.partialUpdateNews.name, () => {
    let newsId: number;
    let partialUpdateSchoolPageNewsRequestBodyDto: PartialUpdateSchoolPageNewsRequestBodyDto;

    beforeEach(() => {
      newsId = NaN;
      partialUpdateSchoolPageNewsRequestBodyDto =
        new PartialUpdateSchoolPageNewsRequestBodyDto();
    });

    it('뉴스 업데이트 성공', async () => {
      const newNews = {
        ...partialUpdateSchoolPageNewsRequestBodyDto,
        title: 'updated title',
      };

      schoolPageNewsRepository.findOneBy.mockResolvedValue({ title: 'title' });
      schoolPageNewsRepository.save.mockResolvedValue(newNews);

      await expect(
        service.partialUpdateNews(
          newsId,
          partialUpdateSchoolPageNewsRequestBodyDto,
        ),
      ).resolves.toEqual(newNews);
    });
  });

  describe(SchoolPagesService.prototype.removeNews.name, () => {
    let newsId: number;

    beforeEach(() => {
      newsId = NaN;
    });

    it('뉴스 업데이트 성공', async () => {
      schoolPageNewsRepository.findOneBy.mockResolvedValue({ id: 1 });

      await expect(service.removeNews(newsId)).resolves.toBeUndefined();
    });
  });
});
