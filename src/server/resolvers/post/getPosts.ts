import { Arg, ClassType, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql';
import { paginate } from '~/helpers/paginate';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { PaginatedPostsResponse } from '~/server/types/responses/post';
import status from 'http-status';
import { Post } from '~/server/entities';
const getPosts = (Base: ClassType) => {
  @Resolver()
  class getPosts extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedPostsResponse)
    async getYourPosts(
      @Arg('limit', (_type) => Int) limitPerPage: number,
      @Arg('page', (_type) => Number) page: number,
      @Ctx() { req }: types.MyContext
    ): Promise<PaginatedPostsResponse> {
      const userId = req.userId;
      const { totalCount, lastPage, entities } = await paginate({
        entity: Post,
        limitPerPage,
        page,
        userId
      });

      return {
        code: status.OK,
        success: true,
        totalCount: totalCount,
        page,
        lastPage,
        paginatedPosts: entities as Post[],
        hasMore: lastPage > page
      };
    }

    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedPostsResponse)
    async getAllPosts(
      @Arg('limitPerPage') limitPerPage: number,
      @Arg('page') page: number
    ): Promise<PaginatedPostsResponse> {
      const { totalCount, lastPage, entities } = await paginate({
        entity: Post,
        limitPerPage,
        page
      });

      return {
        code: status.OK,
        success: true,
        totalCount: totalCount,
        page,
        lastPage,
        paginatedPosts: entities as Post[],
        hasMore: lastPage > page
      };
    }
  }
  return getPosts;
};

export default getPosts;
