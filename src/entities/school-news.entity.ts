import { SchoolEntity } from 'src/entities/school.entity';
import { StudentEntity } from 'src/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'school_news' })
export class SchoolNewsEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학교 뉴스 고유 id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'school_id',
    comment: '학교 교유 ID',
  })
  schoolId: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'student_id',
    comment: '학생 교유 ID',
  })
  studentId: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'title',
    comment: '학교 뉴스 제목',
  })
  title: string;

  @Column({
    type: 'text',
    name: 'description',
    comment: '학교 뉴스 본문',
  })
  description: string;

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

  @ManyToOne(() => SchoolEntity, (school) => school.schoolNewsList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: SchoolEntity;

  @ManyToOne(() => StudentEntity, (student) => student.schoolNewsList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: StudentEntity;
}
