import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import { handler } from '~/server/utils/handler';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { Token } from '~/server/models/Token';
import { nanoid } from 'nanoid';
import { hashedData, sendEmail } from '~/server/utils';
import { BaseResponse } from '~/server/types/responses/common';

const forgotPassword = (Base: ClassType) => {
  @Resolver()
  class forgotPassword extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => String)
    async hello() {
      return 'hello world';
    }
    @Mutation((_return) => BaseResponse)
    async forgotPassword(@Arg('forgotPassword') email: string): Promise<BaseResponse> {
      return handler(async () => {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return {
            code: status.OK,
            success: true
          };
        }
        const userId = user.id.toString();
        const token = nanoid();
        const hashedToken = await hashedData(token);
        await Token.findOneAndDelete({ userId });
        await Token.create({
          userId,
          token: hashedToken
        });
        await sendEmail({ email, token, userId });
        return {
          code: status.OK,
          success: true,
          message: 'We have sent you an email'
        };
      });
    }
  }
  return forgotPassword;
};

export default forgotPassword;
