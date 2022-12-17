import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { handler } from '~/server/utils/handler';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { Token } from '~/server/models/Token';
import bcrypt from 'bcryptjs';
import { BaseResponse } from '~/server/types/responses/common';
import { changePasswordInput } from '~/server/types/inputs';
import { User } from '~/server/entities';
import { hashedData } from '~/server/utils';

const changePassword = (Base: ClassType) => {
  @Resolver()
  class changePassword extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => String)
    async hello() {
      return 'hello world';
    }
    @Mutation((_return) => BaseResponse)
    async changePassword(
      @Arg('changePassword') { userId, token, password }: changePasswordInput
    ): Promise<BaseResponse> {
      return handler(async () => {
        const tokenRecord = await Token.findOne({ userId });
        if (!tokenRecord) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Invalid reset token'
          };
        }
        const conparedToken = await bcrypt.compare(token, tokenRecord.token as string);
        if (!conparedToken) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Invalid or expired reset token'
          };
        }

        const hashedPassword = await hashedData(password);

        const existingUser = await User.findOneBy({ id: userId });

        if (!existingUser) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'User Not Found'
          };
        }

        const comparedPassword = await bcrypt.compare(password, existingUser.password);
        console.log(comparedPassword);
        if (comparedPassword) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'You have used this password before'
          };
        }

        await User.createQueryBuilder()
          .update({ password: hashedPassword })
          .where({ id: userId })
          .execute();

        await Token.deleteMany({ userId });
        return {
          code: status.OK,
          success: true,
          message: 'Your password has been updated successfully'
        };
      });
    }
  }
  return changePassword;
};

export default changePassword;
