import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Student = createParamDecorator(
  (prop: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user[prop] || req.user;
  },
);
