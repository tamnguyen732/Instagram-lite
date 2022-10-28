import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { DeletePostInput } from '~/server/types/inputs';
import { PostResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils';
import status from 'http-status';
const deletePost = (Base: ClassType) => {
  @Resolver()
  class DeletePost extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => PostResponse)
    deletePost(
      @Arg('postId') { postId, userId }: DeletePostInput,
      @Ctx() { req }: types.MyContext
    ): Promise<PostResponse> {
      return handler(async () => {
        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Post Not Found'
          };
        }

        if (userId !== req.userId) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Unauthenticated Action'
          };
        }
        return {
          code: status.OK,
          success: true,
          message: 'You have deleted your post successfully'
        };
      });
    }
  }
  return DeletePost;
};

export default deletePost;
