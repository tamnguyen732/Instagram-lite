import { Arg, ClassType, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { handler } from '~/server/utils';
import status from 'http-status';
import { PaginatedConversationResponse } from '~/server/types/responses/conversation';
import { paginate } from '~/helpers/paginate';
import * as types from '~/server/types';
const getConversations = (Base: ClassType) => {
  @Resolver()
  class getConversations extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello conversation';
    }
    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedConversationResponse)
    getConversations(
      @Arg('limitPage') limitPerPage: number,
      @Arg('page') page: number,
      @Ctx() { req }: types.MyContext
    ): Promise<PaginatedConversationResponse> {
      return handler(async () => {
        const { totalCount, lastPage, entities } = await paginate({
          entity: Conversation,
          limitPerPage,
          page,
          userId: req.userId
        });

        return {
          code: status.OK,
          success: true,
          totalCount,
          lastPage,
          hasMore: lastPage > page,
          paginatedConversations: entities as Conversation[]
        };
      });
    }
  }
  return getConversations;
};

export default getConversations;
