import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { SchoolPageAdminLinkEntity } from 'src/entities/school-page-admin-link.entity';
import { SchoolPageEntity } from 'src/entities/school-page.entity';
import {
  MockDataSource,
  MockSchoolPageAdminLinkRepository,
  MockSchoolPageRepository,
} from 'test/mock/mock.repository';
import { DataSource } from 'typeorm';
import { SchoolPagesService } from './school-pages.service';

describe(SchoolPagesService.name, () => {
  let service: SchoolPagesService;
  let dataSource: MockDataSource;
  let schoolPageRepository: MockSchoolPageRepository;
  let schoolPageAdminLinkRepository: MockSchoolPageAdminLinkRepository;

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
});
