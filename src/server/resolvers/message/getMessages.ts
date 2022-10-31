import { Arg, ClassType, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation, Message } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { handler } from '~/server/utils';
import status from 'http-status';
import { paginate } from '~/helpers/paginate';
import * as types from '~/server/types';
import { PaginatedMessageResponse } from '~/server/types/responses/message';
import { GetMessagesInput } from '~/server/types/inputs';
const getMessages = (Base: ClassType) => {
  @Resolver()
  class getMessages extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'get messages';
    }
    @UseMiddleware(verifyAuth)
    @Query(() => PaginatedMessageResponse)
    getMessages(
      @Arg('getMessageInput') { limitPerPage, page, conversationId }: GetMessagesInput,
      @Ctx() { req }: types.MyContext
    ): Promise<PaginatedMessageResponse> {
      return handler(async () => {
        const { totalCount, lastPage, entities } = await paginate({
          entity: Message,
          limitPerPage,
          page,
          userId: req.userId,
          conversationId
        });

        const messages = entities as Message[];

        const currentConversation = await Conversation.findOne({ where: { id: conversationId } });

        if (!currentConversation) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Conversation Not Found'
          };
        }

        const paginatedMessages = messages
          .filter((m) => currentConversation.members?.includes(m.receiverMessageId))
          .reverse();
        return {
          code: status.OK,
          success: true,
          totalCount,
          lastPage,
          hasMore: lastPage > page,
          paginatedMessages
        };
      });
    }
  }
  return getMessages;
};

export default getMessages;
