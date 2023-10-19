import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPageNewsEntity } from 'src/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/entities/school-page-admin-link.entity';
import { SchoolPageEntity } from 'src/entities/school-page.entity';
import { SchoolPagesController } from './school-pages.controller';
import { SchoolPagesService } from './school-pages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolPageEntity,
      SchoolPageAdminLinkEntity,
      SchoolPageNewsEntity,
    ]),
  ],
  controllers: [SchoolPagesController],
  providers: [SchoolPagesService],
})
export class SchoolPagesModule {}
