import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';

import status from 'http-status';
import { UserResponse } from '~/server/types/responses/user';
const getSingleUser = (Base: ClassType) => {
  @Resolver()
  class getSingleUser extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => UserResponse)
    async getSingleUser(@Arg('username') username: string): Promise<UserResponse> {
      const user = await User.createQueryBuilder()
        .leftJoinAndSelect('User.conversation', 'conversation')
        .leftJoinAndSelect('User.posts', 'posts')
        .where('User.username = :username', { username })
        .getOne();

      if (!user) {
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
    }
  }
  return getSingleUser;
};

export default getSingleUser;
