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

export class MockStudentRepository extends createMockRepository() {}
