import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation, Message } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { handler } from '~/server/utils';
import status from 'http-status';
import { MessageResponse } from '~/server/types/responses/message';
const createMessage = (Base: ClassType) => {
  @Resolver()
  class createMessage extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create message';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => MessageResponse)
    createMessage(
      @Arg('conversationId') conversationId: number,
      @Arg('receiverId') receiverId: number,
      @Arg('text') text: string,
      @Ctx() { req }: types.MyContext
    ): Promise<MessageResponse> {
      return handler(async () => {
        const existingConversation = await Conversation.findOne({ where: { id: conversationId } });
        if (!existingConversation) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: ' Conversation Not Found'
          };
        }

        const newMessage = await Message.create({
          conversationId,
          text,
          userId: req.userId,
          receiverMessageId: receiverId
        }).save();
        if (!newMessage) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Internal Server Error'
          };
        }

        return {
          code: status.CREATED,
          success: true,
          message: 'You have created a message successfully',
          newMessage
        };
      });
    }
  }
  return createMessage;
};

export default createMessage;
