import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';

import { handler } from '~/server/utils';
import status from 'http-status';
import { ConversationResponse } from '~/server/types/responses/conversation';
const deleteConversation = (Base: ClassType) => {
  @Resolver()
  class deleteConversation extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => ConversationResponse)
    deleteConversation(
      @Arg('conversationId') conversationId: number
    ): Promise<ConversationResponse> {
      return handler(async () => {
        await Conversation.delete({ id: conversationId });
        return {
          code: status.CREATED,
          success: true,
          message: 'You have created a conversation successfully'
        };
      });
    }
  }
  return deleteConversation;
};

export default deleteConversation;
