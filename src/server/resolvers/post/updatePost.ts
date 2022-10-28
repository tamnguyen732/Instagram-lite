import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { UpdatePostInput } from '~/server/types/inputs';
import { PostResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils';
import status from 'http-status';
const updatedPost = (Base: ClassType) => {
  @Resolver()
  class updatePost extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => PostResponse)
    updatePost(
      @Arg('updatePostArg') { caption, photo, postId, userId }: UpdatePostInput,
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
        post.caption = caption;
        post.photo = photo;

        await Post.save(post);
        return {
          code: status.OK,
          success: true,
          message: 'You have updated your post successfully',
          post
        };
      });
    }
  }
  return updatePost;
};

export default updatedPost;
