import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Comment } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { handler } from '~/server/utils';
import { getReaction } from '~/server/utils';
import { BaseResponse } from '~/server/types/responses/common';
const reactToComment = (Base: ClassType) => {
  @Resolver()
  class reactToComment extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello reactToComment ';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => BaseResponse)
    async reactToComment(
      @Arg('commentId') id: number,
      @Arg('reaction', { nullable: true }) reaction: string,
      @Ctx() { req }: types.MyContext
    ): Promise<BaseResponse> {
      return handler(async () => {
        const userId = req.userId;

        return await getReaction({ entity: Comment, id, userId, entityName: 'Comment', reaction });
      });
    }
  }
  return reactToComment;
};

export default reactToComment;
