import { SchoolEntity } from 'src/entities/school.entity';
import { StudentEntity } from 'src/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'school_subscribe_link' })
export class SchoolSubscribeLinkEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학교 구독 고유 id',
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
    name: 'school_id',
    comment: '학교 고유 ID',
  })
  schoolId: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => StudentEntity, (student) => student.schoolSubscribeList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: StudentEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.schoolSubscribeList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: SchoolEntity;
}
