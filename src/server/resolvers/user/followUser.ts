import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { handler } from '~/server/utils';
import status from 'http-status';
import { FollowUserInput } from '~/server/types/inputs';
import { UserMutationResponse } from '~/server/types/responses/user';
import { FollowingTypes } from '~/server/types/responses/common';
const followUser = (Base: ClassType) => {
  @Resolver()
  class followUser extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello follow user';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => UserMutationResponse)
    followUser(
      @Arg('followUserArg') { id, type }: FollowUserInput,
      @Ctx() { req }: types.MyContext
    ): Promise<UserMutationResponse> {
      return handler(async () => {
        const currentUserId = parseInt(req.userId);
        const otherUser = await User.findOne({ where: { id } });
        if (!otherUser) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'User Not Found'
          };
        }

        const currentUser = await User.findOne({ where: { id: currentUserId } });
        const existingFollowing = currentUser?.following?.includes(id);

        if (FollowingTypes.FOLLOW === type) {
          if (existingFollowing) {
            return {
              code: status.BAD_REQUEST,
              success: false,
              message: 'You have followed this user'
            };
          } else {
            User.createQueryBuilder()
              .where('id = :id', { id: currentUserId })
              .update(User)
              .set({
                following: () => `array_append("following", ${id})`
              })
              .execute();

            return {
              code: status.OK,
              success: true,
              message: 'You just followed this user'
            };
          }
        }
        User.createQueryBuilder()
          .update(User)
          .where('id = :id', { id: currentUserId })
          .set({
            following: () => `array_remove("following", ${id})`
          })
          .execute();
        return {
          code: status.OK,
          success: true,
          message: 'You just unfollowed this user'
        };
      });
    }
  }
  return followUser;
};

export default followUser;
