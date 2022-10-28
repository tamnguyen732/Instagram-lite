import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { handler } from '~/server/utils';
import { getReaction } from '~/server/utils';
import { BaseResponse } from '~/server/types/responses/common';
const reactToPost = (Base: ClassType) => {
  @Resolver()
  class reactToPost extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello reactToPost ';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => BaseResponse)
    async reactToPost(
      @Arg('postId') id: number,
      @Arg('reaction', { nullable: true }) reaction: string,
      @Ctx() { req }: types.MyContext
    ): Promise<BaseResponse> {
      return handler(async () => {
        const userId = req.userId;

        return await getReaction({ entity: Post, id, userId, entityName: 'Post', reaction });
      });
    }
  }
  return reactToPost;
};

export default reactToPost;
