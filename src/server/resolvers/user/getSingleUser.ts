import { Arg, ClassType, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { handler } from '~/server/utils';
import status from 'http-status';
import { UserResponse } from '~/server/types/responses/user';
import * as types from '~/server/types';
const getSingleUser = (Base: ClassType) => {
  @Resolver()
  class getSingleUser extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => UserResponse)
    getSingleUser(
      @Arg('userId') userId: number,
      @Ctx() { req }: types.MyContext
    ): Promise<UserResponse> {
      return handler(async () => {
        const currentUserId = req.userId;
        const user = await User.find({
          where: { id: currentUserId === userId ? currentUserId : userId },
          relations: ['conversation']
        });

        if (user.length === 0) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'User Not Found'
          };
        }
        return {
          code: status.OK,
          success: true,
          user
        };
      });
    }
  }
  return getSingleUser;
};

export default getSingleUser;
