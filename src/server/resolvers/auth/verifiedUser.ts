import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { handler, sendEmail } from '~/server/utils';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { customAlphabet } from 'nanoid';
import { Code } from '~/server/models/Code';
import { BaseResponse } from '~/server/types/responses/common';

const verifiedUser = (Base: ClassType) => {
  @Resolver()
  class verifiedUser extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => String)
    async hello() {
      return 'string';
    }
    @Mutation((_return) => BaseResponse)
    async verifiedUser(@Arg('verifyUser') email: string): Promise<BaseResponse> {
      return handler(async () => {
        const nanoid = customAlphabet('1234567890', 10);
        const verifyCode = Number(nanoid(6));
        await Code.findOneAndDelete({ email });
        await Code.create({
          code: verifyCode,
          email
        });

        await sendEmail({ email, token: verifyCode });
        return {
          code: status.CREATED,
          success: true,
          message: 'We sent you the code via email'
        };
      });
    }
  }
  return verifiedUser;
};

export default verifiedUser;
