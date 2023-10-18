import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export const mockRequest = {
  query: {},
  params: {},
  user: {},
};
export const mockCtx = {
  switchToHttp() {
    return this;
  },
  getRequest() {
    return JSON.parse(JSON.stringify(mockRequest));
  },
};

export function getParamDecoratorFactory(
  decorator: (prop?: any) => ParameterDecorator,
  prop?: string,
) {
  class Test {
    public test(@decorator(prop) value: unknown) {
      return;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
