import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { SchoolPageNewsEntity } from 'src/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/entities/school-page-admin-link.entity';
import { SchoolPageEntity } from 'src/entities/school-page.entity';
import {
  MockDataSource,
  MockSchoolPageAdminLinkRepository,
  MockSchoolPageNewsRepository,
  MockSchoolPageRepository,
} from 'test/mock/mock.repository';
import { DataSource } from 'typeorm';
import { SchoolPagesService } from './school-pages.service';

describe(SchoolPagesService.name, () => {
  let service: SchoolPagesService;
  let dataSource: MockDataSource;
  let schoolPageRepository: MockSchoolPageRepository;
  let schoolPageAdminLinkRepository: MockSchoolPageAdminLinkRepository;
  let schoolPageNewsRepository: MockSchoolPageNewsRepository;

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
});
