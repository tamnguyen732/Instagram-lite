import { Arg, ClassType, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation, Message } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { handler } from '~/server/utils';
import status from 'http-status';
import { PaginatedConversationResponse } from '~/server/types/responses/conversation';
import { paginate } from '~/helpers/paginate';
import * as types from '~/server/types';
const getMessages = (Base: ClassType) => {
  @Resolver()
  class getMessages extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'get messages';
    }
    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedConversationResponse)
    getMessages(
      @Arg('limitPage') limitPerPage: number,
      @Arg('page') page: number,
      @Arg('receiverId') receiverId: number,
      @Ctx() { req }: types.MyContext
    ): Promise<PaginatedConversationResponse> {
      return handler(async () => {
        const { totalCount, lastPage, entities } = await paginate({
          entity: Message,
          limitPerPage,
          page,
          userId: req.userId
        });

        const messages = entities as Message[];

        // const paginateMessages = messages.filter(
        //   (m) => m.receiverMessageId === receiverId && m.creatorMessageId === req.userId
        // );

        return {
          code: status.OK,
          success: true,
          totalCount,
          lastPage,
          hasMore: lastPage > page
        };
      });
    }
  }
  return getMessages;
};

export default getMessages;
