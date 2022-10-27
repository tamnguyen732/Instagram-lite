import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Comment } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';

import { PostResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils';
import status from 'http-status';
import { UpdateCommentInput } from '~/server/types/inputs';
const updateComment = (Base: ClassType) => {
  @Resolver()
  class updateComment extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => PostResponse)
    updateComment(
      @Arg('updateCommentArg') { text, userId, commentId }: UpdateCommentInput,
      @Ctx() { req }: types.MyContext
    ): Promise<PostResponse> {
      return handler(async () => {
        if (userId !== parseInt(req.userId)) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Unauthenticated Action'
          };
        }

        const comment = await Comment.findOne({ where: { id: commentId } });
        if (!comment) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Comment Not Found'
          };
        }

        comment.text = text;

        await Comment.save(comment);
        return {
          code: status.OK,
          success: true,
          message: 'You have updated your comment successfully',
          comment
        };
      });
    }
  }
  return updateComment;
};

export default updateComment;
