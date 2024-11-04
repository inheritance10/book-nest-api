import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'ws') {
      return ctx.switchToWs().getClient().identity;
    } else {
      return ctx.switchToHttp().getRequest().identity;
    }
  },
);
