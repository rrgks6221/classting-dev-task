import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/apis/students/entities/student.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateStudentDto } from '../dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const existStudent = await this.studentRepository.findOne({
      select: {
        email: true,
      },
      where: {
        email: createStudentDto.email,
      },
    });

    if (existStudent) {
      throw new ConflictException('존재하는 이메일');
    }

    const newStudent = this.studentRepository.create(createStudentDto);

    await this.studentRepository.save(newStudent);

    return newStudent;
  }

  findOneBy(where: FindOptionsWhere<StudentEntity>) {
    return this.studentRepository.findOneBy(where);
  }
}
