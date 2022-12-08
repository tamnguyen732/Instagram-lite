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
        const otherUser = await User.findOne({ where: { id } });
        if (!otherUser) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'User Not Found'
          };
        }

        if (id === req.userId) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'You can not follow yourself'
          };
        }
        const currentUser = await User.findOne({ where: { id: req.userId } });
        const existingFollowing = currentUser?.following.some((e) => e.id === id);
        const existingFollower = otherUser?.followers.some((e) => e.id === id);
        if (FollowingTypes.FOLLOW === type) {
          if (existingFollowing) {
            return {
              code: status.BAD_REQUEST,
              success: false,
              message: 'You arealdy followed this user'
            };
          } else {
            if (!existingFollower && id !== req.userId) {
              otherUser?.followers.push(JSON.parse(JSON.stringify(currentUser)));
              await User.save(otherUser);
            }
            currentUser?.following.push(JSON.parse(JSON.stringify(otherUser)));
            await User.save(currentUser as User);

            return {
              code: status.OK,
              success: true,
              message: 'You just followed this user'
            };
          }
        } else {
          const otherUserIndex = otherUser?.followers.findIndex((e) => e.id === req.userId);
          otherUser?.followers.splice(otherUserIndex as number, 1);
          await User.save(otherUser);

          const currentUserIndex = currentUser?.following.findIndex((e) => e.id === id);
          currentUser?.following.splice(currentUserIndex as number, 1);
          await User.save(currentUser as User);
          return {
            code: status.OK,
            success: true,
            message: 'You just unfollowed this user'
          };
        }
      });
    }
  }
  return followUser;
};

export default followUser;
