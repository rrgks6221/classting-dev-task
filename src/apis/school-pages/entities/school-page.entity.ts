import { SchoolPageType } from 'src/apis/school-pages/constants/school-page.enum';
import { SchoolPageNewsEntity } from 'src/apis/school-pages/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/apis/school-pages/entities/school-page-admin-link.entity';
import { SchoolPageSubscribeLinkEntity } from 'src/apis/school-pages/entities/school-page-subscribe-link.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'school_page' })
export class SchoolPageEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학교 페이지 고유 id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '학교 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'type',
    comment: '학교 타입',
  })
  type: SchoolPageType;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'address',
    comment: '학교 주소',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'detail_address',
    comment: '학교 상세 주소',
  })
  detailAddress: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'website_url',
    comment: '학교 웹사이트 주소',
  })
  websiteUrl: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '생성 일자',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '수정 일자',
  })
  updatedAt: Date;

  @OneToMany(
    () => SchoolPageAdminLinkEntity,
    (schoolPageAdmin) => schoolPageAdmin.schoolPage,
  )
  schoolPageAdmins: SchoolPageAdminLinkEntity[];

  @OneToMany(
    () => SchoolPageNewsEntity,
    (schoolPageNews) => schoolPageNews.schoolPage,
  )
  schoolPageNewsList: SchoolPageNewsEntity[];

  @OneToMany(
    () => SchoolPageSubscribeLinkEntity,
    (schoolPageSubscribe) => schoolPageSubscribe.schoolPage,
  )
  schoolPageSubscribeList: SchoolPageSubscribeLinkEntity[];
}
