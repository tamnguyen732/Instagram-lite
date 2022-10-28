import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { handler } from '~/server/utils';
import status from 'http-status';
import { ConversationResponse } from '~/server/types/responses/conversation';
const getConversationById = (Base: ClassType) => {
  @Resolver()
  class getConversationById extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello conversation';
    }
    @UseMiddleware(verifyAuth)
    @Query(() => ConversationResponse)
    getConversationById(
      @Arg('conversationId') conversationId: number
    ): Promise<ConversationResponse> {
      return handler(async () => {
        const conversation = await Conversation.findOne({ where: { id: conversationId } });

        if (!conversation) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Conversation Not Found'
          };
        }
        return {
          code: status.CREATED,
          success: true,
          message: 'You have created a conversation successfully',
          conversation
        };
      });
    }
  }
  return getConversationById;
};

export default getConversationById;
