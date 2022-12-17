import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { paginate } from '~/helpers/paginate';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { User } from '~/server/entities';
import { PaginatedUsersResponse } from '~/server/types/responses/user';
import { FindUsersInput } from '~/server/types/inputs';
const findUsers = (Base: ClassType) => {
  @Resolver()
  class findUsers extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedUsersResponse)
    async findUsers(
      @Arg('query') { limitPerPage, page, searchQuery }: FindUsersInput
    ): Promise<PaginatedUsersResponse> {
      const { totalCount, lastPage, entities } = await paginate({
        entity: User,
        limitPerPage,
        page,
        searchQuery
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
  return findUsers;
};

export default findUsers;
