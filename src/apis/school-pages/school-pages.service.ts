import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-news-request-body.dto';
import { CreateSchoolPageRequestBodyDto } from 'src/apis/school-pages/dto/create-school-page-request-body.dto';
import { FindAllSchoolPageNewsRequestQueryDto } from 'src/apis/school-pages/dto/find-all-school-page-news-request-query.dto';
import { FindAllSchoolPageRequestQueryDto } from 'src/apis/school-pages/dto/find-all-school-page-request-query.dto';
import { PartialUpdateSchoolPageNewsRequestBodyDto } from 'src/apis/school-pages/dto/partial-update-school-page-news-request-body.dto';
import { SchoolPageNewsEntity } from 'src/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/entities/school-page-admin-link.entity';
import { SchoolPageSubscribeLinkEntity } from 'src/entities/school-page-subscribe-link.entity';
import { SchoolPageEntity } from 'src/entities/school-page.entity';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class SchoolPagesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(SchoolPageEntity)
    private readonly schoolPageRepository: Repository<SchoolPageEntity>,
    @InjectRepository(SchoolPageAdminLinkEntity)
    private readonly schoolPageAdminLinkRepository: Repository<SchoolPageAdminLinkEntity>,
    @InjectRepository(SchoolPageNewsEntity)
    private readonly schoolPageNewsRepository: Repository<SchoolPageNewsEntity>,
    @InjectRepository(SchoolPageSubscribeLinkEntity)
    private readonly schoolPageSubscribeLinkRepository: Repository<SchoolPageSubscribeLinkEntity>,
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

  async findAllAndCount(
    studentId: number,
    findAllSchoolPageRequestQueryDto: FindAllSchoolPageRequestQueryDto,
  ) {
    const { page, pageSize, sortBy, orderBy, type, isSubscribe } =
      findAllSchoolPageRequestQueryDto;

    const where: FindOptionsWhere<SchoolPageEntity> = {
      type,
      schoolPageSubscribeList: isSubscribe
        ? {
            studentId,
          }
        : undefined,
    };

    const [schoolPages, totalCount] =
      await this.schoolPageRepository.findAndCount({
        where,
        order: { [sortBy || 'id']: orderBy || 'ASC' },
        skip: page * pageSize,
        take: pageSize,
      });

    return [schoolPages, totalCount];
  }

  async findOneOrNotFound(where: FindOptionsWhere<SchoolPageEntity>) {
    const existSchoolPage = await this.schoolPageRepository.findOneBy(where);

    if (!existSchoolPage) {
      throw new NotFoundException('존재하지 않는 학교 페이지');
    }

    return existSchoolPage;
  }

  async subscribe(studentId: number, schoolPageId: number): Promise<void> {
    await this.findOneOrNotFound({ id: schoolPageId });

    const alreadySubscribe =
      await this.schoolPageSubscribeLinkRepository.findOne({
        select: {
          id: true,
        },
        where: {
          schoolPageId,
          studentId,
        },
      });

    if (alreadySubscribe) {
      throw new ConflictException('이미 구독중입니다.');
    }

    await this.schoolPageSubscribeLinkRepository.save({
      schoolPageId,
      studentId,
    });
  }

  async unsubscribe(studentId: number, schoolPageId: number): Promise<void> {
    await this.findOneOrNotFound({ id: schoolPageId });

    const alreadySubscribe =
      await this.schoolPageSubscribeLinkRepository.findOne({
        select: {
          id: true,
        },
        where: {
          schoolPageId,
          studentId,
        },
      });

    if (!alreadySubscribe) {
      throw new ConflictException('구독중이 아닙니다.');
    }

    await this.schoolPageSubscribeLinkRepository.delete({
      schoolPageId,
      studentId,
    });
  }

  async findOneSchoolPageAdminOrForbidden(
    studentId: number,
    schoolPageId: number,
  ) {
    const existSchoolPageAdminLink =
      await this.schoolPageAdminLinkRepository.findOneBy({
        studentId,
        schoolPageId,
      });

    if (!existSchoolPageAdminLink) {
      throw new ForbiddenException('학교 페이지 관리자가 아닙니다.');
    }

    return existSchoolPageAdminLink;
  }

  async createNews(
    studentId: number,
    schoolPageId: number,
    createSchoolPageNewRequestBodyDto: CreateSchoolPageNewsRequestBodyDto,
  ) {
    const newSchoolNews = this.schoolPageNewsRepository.create({
      studentId,
      schoolPageId,
      ...createSchoolPageNewRequestBodyDto,
    });

    await this.schoolPageNewsRepository.save(newSchoolNews);

    return newSchoolNews;
  }

  async findAllAndCountNews(
    schoolPageId: number,
    findAllSchoolPageNewsRequestQueryDto: FindAllSchoolPageNewsRequestQueryDto,
  ) {
    const { page, pageSize, sortBy, orderBy } =
      findAllSchoolPageNewsRequestQueryDto;

    const where: FindOptionsWhere<SchoolPageNewsEntity> = {
      schoolPageId,
    };

    const [schoolPageNewsList, totalCount] =
      await this.schoolPageNewsRepository.findAndCount({
        where,
        order: { [sortBy || 'id']: orderBy || 'ASC' },
        skip: page * pageSize,
        take: pageSize,
      });

    return [schoolPageNewsList, totalCount];
  }

  async findOneNewsOrNotFound(newsId: number) {
    const existNews = await this.schoolPageNewsRepository.findOneBy({
      id: newsId,
    });

    if (!existNews) {
      throw new NotFoundException('존재하지 않는 뉴스입니다.');
    }

    return existNews;
  }

  async partialUpdateNews(
    newsId: number,
    partialUpdateSchoolPageNewsRequestBodyDto: PartialUpdateSchoolPageNewsRequestBodyDto,
  ) {
    const oldNews = await this.findOneNewsOrNotFound(newsId);

    return this.schoolPageNewsRepository.save({
      ...oldNews,
      ...partialUpdateSchoolPageNewsRequestBodyDto,
    });
  }

  async removeNews(newsId: number): Promise<void> {
    await this.findOneNewsOrNotFound(newsId);

    await this.schoolPageNewsRepository.delete({
      id: newsId,
    });
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
