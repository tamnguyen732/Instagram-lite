import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post, User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { createPostInput } from '~/server/types/inputs/createPostInput';
import { PostMutationResponse } from '~/server/types/responses/post/';
import { handler } from '~/server/utils/handler';

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
      @Arg('createPostArg') { caption, photo }: createPostInput,
      @Ctx() { req }: types.MyContext,
    ): Promise<PostMutationResponse> {
      return handler(async () => {
        const id = req.userId;
        console.log(id);
        const newPost = Post.create({
          caption,
          photo,
          userId: parseInt(req.userId),
        });

        await Post.save(newPost);

        const user = await User.findOneBy({ id: parseInt(req.userId) });
        if (!user) {
          return {
            code: 404,
            success: false,
            message: 'User not found',
          };
        }

        user.posts = [newPost];
        await User.save(user);
        return {
          code: 202,
          success: true,
          message: 'You have created a post successfully',
        };
      });
    }
  }
  return createPost;
};

export default createPost;
