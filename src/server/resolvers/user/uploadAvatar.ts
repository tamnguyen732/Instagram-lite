import { Arg, ClassType, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { User } from '~/server/entities';
import * as types from '~/server/types';
import { BaseResponse } from '~/server/types/responses/common';
const uploadAvatar = (Base: ClassType) => {
  @Resolver()
  class uploadAvatar extends Base {
    @UseMiddleware(verifyAuth)
    @Mutation(() => BaseResponse)
    async uploadAvatar(
      @Arg('image', (_type) => Int) image: string,
      @Ctx() { req }: types.MyContext
    ): Promise<BaseResponse> {
      const user = await User.findOne({ where: { id: req.userId } });
      if (!user) {
        return {
          code: status.NOT_FOUND,
          success: false,
          message: 'User Not Found'
        };
      }

      user.avatar = image;
      await User.save(user);
      return {
        code: status.OK,
        success: true,
        message: 'You have uploaded your avatar successfully'
      };
    }
  }
  return uploadAvatar;
};

export default uploadAvatar;
