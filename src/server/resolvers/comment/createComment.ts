import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Comment, Post } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { handler } from '~/server/utils';
import status from 'http-status';
import { CommentMutationResponse } from '~/server/types/responses/comment';
import { CreateCommentInput } from '~/server/types/inputs';
import * as types from '~/server/types';
const createComment = (Base: ClassType) => {
  @Resolver()
  class createComment extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create comment';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => CommentMutationResponse)
    createComment(
      @Arg('createCommentArg') { text, postId }: CreateCommentInput,
      @Ctx() { req }: types.MyContext
    ): Promise<CommentMutationResponse> {
      return handler(async () => {
        const currentPost = await Post.findOne({ where: { id: postId } });

        if (!currentPost) {
          return {
            code: status.NOT_FOUND,
            success: false
          };
        }

        const newComment = Comment.create({
          text,
          postId,
          userId: req.userId
        });
        await Comment.save(newComment);
        await Post.save(currentPost);
        return {
          code: status.CREATED,
          success: true,
          message: 'You have created a comment successfully'
        };
      });
    }
  }
  return createComment;
};

export default createComment;
