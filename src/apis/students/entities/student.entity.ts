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

@Entity({ name: 'student' })
export class StudentEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학생 id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'name',
    comment: '학생 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
    comment: '학생 이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
    comment: '학생 비밀번호',
  })
  password: string;

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
    (schoolPageAdmin) => schoolPageAdmin.student,
  )
  schoolPageAdmins: SchoolPageAdminLinkEntity[];

  @OneToMany(
    () => SchoolPageNewsEntity,
    (schoolPageNews) => schoolPageNews.student,
  )
  schoolPageNewsList: SchoolPageNewsEntity[];

  @OneToMany(
    () => SchoolPageSubscribeLinkEntity,
    (schoolPageSubscribe) => schoolPageSubscribe.student,
  )
  schoolPageSubscribeList: SchoolPageSubscribeLinkEntity[];
}
