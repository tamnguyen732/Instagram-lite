import { Arg, ClassType, Int, Query, Resolver, UseMiddleware } from 'type-graphql';
import { paginate } from '~/helpers/paginate';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { User } from '~/server/entities';
import { PaginatedUsersResponse } from '~/server/types/responses/user';
const getUsers = (Base: ClassType) => {
  @Resolver()
  class getUsers extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedUsersResponse)
    async getUsers(
      @Arg('limit', (_type) => Int) limitPerPage: number,
      @Arg('page', (_type) => Number) page: number
    ): Promise<PaginatedUsersResponse> {
      const { totalCount, lastPage, entities } = await paginate({
        entity: User,
        limitPerPage,
        page
      });
      return {
        code: status.OK,
        success: true,
        totalCount: totalCount,
        page,
        lastPage,
        paginatedUsers: entities as User[],
        hasMore: lastPage > page
      };
    }
  }
  return getUsers;
};

export default getUsers;
