import { TransformFnParams } from 'class-transformer';
import { BooleanString } from 'src/constants/common.enum';

export const transformStringBoolean = ({
  value,
}: Partial<TransformFnParams>) => {
  if (value === BooleanString.True) return true;
  if (value === BooleanString.False) return false;
  return value;
};
