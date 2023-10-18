import { Exclude } from 'class-transformer';
import { SchoolAdminLinkEntity } from 'src/entities/school-admin-link.entity';
import { SchoolNewsEntity } from 'src/entities/school-news.entity';
import { SchoolSubscribeLinkEntity } from 'src/entities/school-subscribe-link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @Exclude()
  password: string;

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

  @OneToMany(() => SchoolAdminLinkEntity, (schoolAdmin) => schoolAdmin.student)
  schoolAdmins: SchoolAdminLinkEntity[];

  @OneToMany(() => SchoolNewsEntity, (schoolNews) => schoolNews.student)
  schoolNewsList: SchoolNewsEntity[];

  @OneToMany(
    () => SchoolSubscribeLinkEntity,
    (schoolSubscribe) => schoolSubscribe.student,
  )
  schoolSubscribeList: SchoolSubscribeLinkEntity[];
}
