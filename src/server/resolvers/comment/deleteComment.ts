import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Comment } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { DeleteCommentInput } from '~/server/types/inputs';
import { PostResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils';
import status from 'http-status';
import { CommentResponse } from '~/server/types/responses/comment';
const deleteComment = (Base: ClassType) => {
  @Resolver()
  class deleteComment extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => CommentResponse)
    deleteComment(
      @Arg('deleteCommentArg') { commentId, userId }: DeleteCommentInput,
      @Ctx() { req }: types.MyContext
    ): Promise<PostResponse> {
      return handler(async () => {
        if (userId !== req.userId) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Unauthenticated Action'
          };
        }

        const comment = await Comment.delete({ id: commentId });
        if (!comment) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Can Not Delete Comment'
          };
        }

        return {
          code: status.OK,
          success: true,
          message: 'You have deleted your comment successfully'
        };
      });
    }
  }
  return deleteComment;
};

export default deleteComment;
