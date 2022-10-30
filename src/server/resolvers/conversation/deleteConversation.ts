import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';

import { handler } from '~/server/utils';
import status from 'http-status';
import { ConversationResponse } from '~/server/types/responses/conversation';
import * as types from '~/server/types';
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
      @Arg('conversationId') conversationId: number,
      @Ctx() { req }: types.MyContext
    ): Promise<ConversationResponse> {
      return handler(async () => {
        const currentConversation = await Conversation.findOne({ where: { id: conversationId } });

        if (!currentConversation) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'Conversation Not Found'
          };
        }

        const member = currentConversation.members?.filter((m) => m !== req.userId);

        currentConversation.members = member;

        await Conversation.save(currentConversation);

        if (currentConversation.members?.length === 0) {
          await Conversation.delete(conversationId);
        }
        return {
          code: status.OK,
          success: true,
          message: 'You have deleted this conversation successfully'
        };
      });
    }
  }
  return deleteConversation;
};

export default deleteConversation;
