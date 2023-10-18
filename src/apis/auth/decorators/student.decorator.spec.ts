import { Student } from 'src/apis/auth/decorators/student.decorator';
import {
  getParamDecoratorFactory,
  mockCtx,
  mockRequest,
} from 'test/mock/mock.common';

describe(Student.name, () => {
  let factory: any;
  let ctx: any;
  let request: any;

  beforeEach(() => {
    factory = getParamDecoratorFactory(Student);
    ctx = mockCtx;
    request = mockRequest;
  });

  it('student 의 모든 정보 가져오기', () => {
    const id = 1;
    const name = 'name';

    request.user.id = id;
    request.user.name = name;

    const user = factory(undefined, ctx);

    expect(user).toStrictEqual({
      id,
      name,
    });
  });

  it('student 의 특정 프로퍼티 가져오기', () => {
    const id = 1;
    const name = 'name';

    request.user.id = id;
    request.user.name = name;

    const user = factory('id', ctx);

    expect(user).toBe(id);
  });

  it('student 의 존재하지 않는 프로퍼티 접근 시 모든 정보를 반환', () => {
    const id = 1;
    const name = 'name';

    request.user.id = id;
    request.user.name = name;

    const user = factory('notExistProp', ctx);

    expect(user).toStrictEqual({
      id,
      name,
    });
  });
});
