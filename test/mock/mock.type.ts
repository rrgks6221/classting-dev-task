export type MockClass<T> = {
  [key in keyof T]: jest.Mock;
};
