import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post, User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { CreatePostInput } from '~/server/types/inputs/';
import { PostMutationResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils';
import status from 'http-status';
const createPost = (Base: ClassType) => {
  @Resolver()
  class createPost extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => PostMutationResponse)
    createPost(
      @Arg('createPostArg') { caption, photo }: CreatePostInput,
      @Ctx() { req }: types.MyContext
    ): Promise<PostMutationResponse> {
      return handler(async () => {
        const newPost = Post.create({
          caption,
          photo,
          userId: parseInt(req.userId)
        });

        await Post.save(newPost);

        const user = await User.findOneBy({ id: parseInt(req.userId) });
        if (!user) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'User not found'
          };
        }

        user.posts = [newPost];
        await User.save(user);
        return {
          code: status.CREATED,
          success: true,
          message: 'You have created a post successfully'
        };
      });
    }
  }
  return createPost;
};

export default createPost;
