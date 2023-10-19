import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPageNewsEntity } from 'src/apis/school-pages/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/apis/school-pages/entities/school-page-admin-link.entity';
import { SchoolPageSubscribeLinkEntity } from 'src/apis/school-pages/entities/school-page-subscribe-link.entity';
import { SchoolPageEntity } from 'src/apis/school-pages/entities/school-page.entity';
import { SchoolPagesController } from '../controllers/school-pages.controller';
import { SchoolPagesService } from '../school-pages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolPageEntity,
      SchoolPageAdminLinkEntity,
      SchoolPageNewsEntity,
      SchoolPageSubscribeLinkEntity,
    ]),
  ],
  controllers: [SchoolPagesController],
  providers: [SchoolPagesService],
})
export class SchoolPagesModule {}
