import { SchoolPageEntity } from 'src/entities/school-page.entity';
import { StudentEntity } from 'src/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'school_admin_link' })
export class SchoolAdminLinkEntity {
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

  @Column({
    type: 'timestamp',
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => SchoolPageEntity, (schoolPage) => schoolPage.schoolAdmins, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'school_page_id', referencedColumnName: 'id' }])
  schoolPage: SchoolPageEntity;

  @ManyToOne(() => StudentEntity, (student) => student.schoolAdmins, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: StudentEntity;
}
