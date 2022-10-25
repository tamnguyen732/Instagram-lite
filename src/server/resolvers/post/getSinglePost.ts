import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { PostResponse } from '~/server/types/responses/post';
import { handler } from '~/server/utils';
import status from 'http-status';
const getSinglePost = (Base: ClassType) => {
  @Resolver()
  class getSinglePost extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => PostResponse)
    getSinglePost(@Arg('postId', (_type) => Number) postId: number): Promise<PostResponse> {
      return handler(async () => {
        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Post Not Found'
          };
        }
        return {
          code: status.OK,
          success: true,
          post
        };
      });
    }
  }
  return getSinglePost;
};

export default getSinglePost;
