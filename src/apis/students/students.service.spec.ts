import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { CreateStudentDto } from 'src/apis/students/dto/create-student.dto';
import { ENCRYPTION_TOKEN } from 'src/constants/token.constant';
import { StudentEntity } from 'src/entities/student.entity';
import { MockStudentRepository } from 'test/mock/mock.repository';
import { StudentsService } from './students.service';

describe(StudentsService.name, () => {
  let service: StudentsService;
  let studentRepository: MockStudentRepository;
  let encryption: { [key in keyof typeof bcrypt]: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(StudentEntity),
          useClass: MockStudentRepository,
        },
        {
          provide: ENCRYPTION_TOKEN,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<MockStudentRepository>(
      getRepositoryToken(StudentEntity),
    );
    encryption =
      module.get<{ [key in keyof typeof bcrypt]: jest.Mock }>(ENCRYPTION_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(StudentsService.prototype.create, () => {
    it('동일한 이메일이 존재하는 경우', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'name',
        email: 'email',
        password: 'password',
      };

      studentRepository.findOne.mockResolvedValue({ email: 'email' });

      expect(service.create(createStudentDto)).rejects.toThrowError(
        ConflictException,
      );
    });

    it('학생 생성 성공', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'name',
        email: 'email',
        password: 'password',
      };
      const hashedPassword = 'hashedPassword';

      studentRepository.findOne.mockResolvedValue(null);
      studentRepository.create.mockReturnValue(createStudentDto);
      encryption.hash.mockResolvedValue(hashedPassword);

      await expect(service.create(createStudentDto)).resolves.toEqual(
        createStudentDto,
      );
      expect(studentRepository.save).toBeCalledWith({
        name: 'name',
        email: 'email',
        password: hashedPassword,
      });
    });
  });

  describe(StudentsService.prototype.findOneBy, () => {
    it('학생이 존재하지 않는 경우', async () => {
      studentRepository.findOneBy.mockResolvedValue(null);

      expect(service.findOneBy({ id: 1 })).resolves.toBeNull();
    });

    it('학생이 존재하는 경우', async () => {
      studentRepository.findOneBy.mockResolvedValue({ id: 1, name: 'name' });

      expect(service.findOneBy({ id: 1 })).resolves.toEqual({
        id: 1,
        name: 'name',
      });
    });
  });
});
