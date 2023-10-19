import { SchoolPageEntity } from 'src/apis/school-pages/entities/school-page.entity';
import { StudentEntity } from 'src/apis/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'school_page_admin_link' })
export class SchoolPageAdminLinkEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학교 관리자 고유 id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'student_id',
    comment: '학생 고유 ID',
  })
  studentId: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'school_page_id',
    comment: '학교 페이지 고유 ID',
  })
  schoolPageId: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '생성 일자',
  })
  createdAt: Date;

  @ManyToOne(
    () => SchoolPageEntity,
    (schoolPage) => schoolPage.schoolPageAdmins,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'school_page_id', referencedColumnName: 'id' }])
  schoolPage: SchoolPageEntity;

  @ManyToOne(() => StudentEntity, (student) => student.schoolPageAdmins, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: StudentEntity;
}
