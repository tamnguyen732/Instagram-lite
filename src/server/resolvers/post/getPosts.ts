import { ClassType, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post, User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';

const getPosts = (Base: ClassType) => {
  @Resolver()
  class getPosts extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => [User])
    async getYourPosts(@Ctx() { req }: types.MyContext): Promise<User[] | null> {
      if (!req.userId) {
        return null;
      }
      const user = await User.find({ where: { id: parseInt(req.userId) }, relations: ['posts'] });
      if (!user) {
        return null;
      }
      return user;
    }
  }
  return getPosts;
};

export default getPosts;
