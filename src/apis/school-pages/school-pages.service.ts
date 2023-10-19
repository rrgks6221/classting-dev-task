import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { SchoolPageAdminLinkEntity } from 'src/entities/school-page-admin-link.entity';
import { SchoolPageEntity } from 'src/entities/school-page.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SchoolPagesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(SchoolPageEntity)
    private readonly schoolPageRepository: Repository<SchoolPageEntity>,
    @InjectRepository(SchoolPageAdminLinkEntity)
    private readonly schoolPageAdminLinkRepository: Repository<SchoolPageAdminLinkEntity>,
  ) {}

  async create(
    studentId: number,
    createSchoolPageRequestBodyDto: CreateSchoolPageRequestBodyDto,
  ) {
    const existSchoolPage = await this.schoolPageRepository.findOne({
      where: {
        name: createSchoolPageRequestBodyDto.name,
      },
    });

    const isSameSchoolPage = this.isSameSchoolPage(
      createSchoolPageRequestBodyDto,
      existSchoolPage,
    );
    if (isSameSchoolPage) {
      throw new ConflictException('이미 존재하는 학교 페이지 입니다.');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const entityManager = queryRunner.manager;

      const newSchoolPage = this.schoolPageRepository.create(
        createSchoolPageRequestBodyDto,
      );

      await entityManager
        .withRepository(this.schoolPageRepository)
        .save(newSchoolPage);

      await entityManager
        .withRepository(this.schoolPageAdminLinkRepository)
        .save({
          studentId,
          schoolPageId: newSchoolPage.id,
        });

      await queryRunner.commitTransaction();

      return newSchoolPage;
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      console.error(`${SchoolPagesService.name}.${this.create.name} 서버 에러`);
      throw new InternalServerErrorException('서버 에러');
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  createNews() {
    return;
  }

  partialUpdateNews() {
    return;
  }

  removeNews() {
    return;
  }

  private isSameSchoolPage(
    newSchoolPage: CreateSchoolPageRequestBodyDto,
    oldSchoolPage: SchoolPageEntity | null,
  ) {
    if (oldSchoolPage === null) {
      return false;
    }

    return (
      newSchoolPage.name === oldSchoolPage.name &&
      newSchoolPage.address === oldSchoolPage.address &&
      newSchoolPage.detailAddress === oldSchoolPage.detailAddress
    );
  }
}
