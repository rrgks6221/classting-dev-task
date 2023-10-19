import { Repository } from 'typeorm';

const createMockRepository = () => {
  return class {
    create = jest.fn();
    find = jest.fn();
    findBy = jest.fn();
    findAll = jest.fn();
    findOne = jest.fn();
    findOneBy = jest.fn();
    countBy = jest.fn();
    save = jest.fn();
    update = jest.fn();
    delete = jest.fn();
  };
};

export class MockDataSource {
  createQueryRunner() {
    return {
      isTransactionActive: jest.fn(),
      isReleased: jest.fn(),
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        withRepository: (repository: Repository<any>) => {
          return repository;
        },
        create: jest.fn(),
      },
    };
  }
}

export class MockStudentRepository extends createMockRepository() {}

export class MockSchoolPageRepository extends createMockRepository() {}

export class MockSchoolPageAdminLinkRepository extends createMockRepository() {}

export class MockSchoolPageNewsRepository extends createMockRepository() {}

export class MockSchoolPageSubscribeLinkRepository extends createMockRepository() {}
