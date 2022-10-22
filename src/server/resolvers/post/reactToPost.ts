import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { PostMutationResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils/handler';
import { getReaction } from '~/server/utils/getReaction';
import { ReactToPostInput } from '~/server/types/inputs';

const createPost = (Base: ClassType) => {
  @Resolver()
  class createPost extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => PostMutationResponse)
    createPost(@Arg('createPostArg') { id }: ReactToPostInput, @Ctx() { req }: types.MyContext) {
      return handler(async () => {
        const userId = parseInt(req.userId);
        getReaction({ entity: Post, id, userId, EntityType: 'Post' });
      });
    }
  }
  return createPost;
};

export default createPost;
