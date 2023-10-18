import { SchoolType } from 'src/constants/school/school.enum';
import { SchoolNewsEntity } from 'src/entities/school-news.entity';
import { SchoolPageAdminLinkEntity } from 'src/entities/school-page-admin-link.entity';
import { SchoolSubscribeLinkEntity } from 'src/entities/school-subscribe-link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  type: SchoolType;

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

  @Column({
    type: 'timestamp',
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    comment: '수정 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(
    () => SchoolPageAdminLinkEntity,
    (schoolPageAdmin) => schoolPageAdmin.schoolPage,
  )
  schoolPageAdmins: SchoolPageAdminLinkEntity[];

  @OneToMany(() => SchoolNewsEntity, (schoolNews) => schoolNews.schoolPage)
  schoolNewsList: SchoolNewsEntity[];

  @OneToMany(
    () => SchoolSubscribeLinkEntity,
    (schoolSubscribe) => schoolSubscribe.schoolPage,
  )
  schoolSubscribeList: SchoolSubscribeLinkEntity[];
}
