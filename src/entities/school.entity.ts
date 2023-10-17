import { SchoolType } from 'src/constants/school/school.enum';
import { SchoolAdminLinkEntity } from 'src/entities/school-admin-link.entity';
import { SchoolNewsEntity } from 'src/entities/school-news.entity';
import { SchoolSubscribeLinkEntity } from 'src/entities/school-subscribe-link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'school' })
export class SchoolEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학교 고유 id',
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

  @OneToMany(() => SchoolAdminLinkEntity, (schoolAdmin) => schoolAdmin.school)
  schoolAdmins: SchoolAdminLinkEntity[];

  @OneToMany(() => SchoolNewsEntity, (schoolNews) => schoolNews.school)
  schoolNewsList: SchoolNewsEntity[];

  @OneToMany(
    () => SchoolSubscribeLinkEntity,
    (schoolSubscribe) => schoolSubscribe.school,
  )
  schoolSubscribeList: SchoolSubscribeLinkEntity[];
}
