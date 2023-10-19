import { TransformFnParams } from 'class-transformer';

export const transformPage = ({ value }: Partial<TransformFnParams>) => {
  return Number(value) ? Number(value) - 1 : value;
};
