import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { handler } from '~/server/utils';
import status from 'http-status';
import { ArrayContains } from 'typeorm';
import { ConversationResponse } from '~/server/types/responses/conversation';
const createConversation = (Base: ClassType) => {
  @Resolver()
  class createConversation extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello create post';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => ConversationResponse)
    createConversation(
      @Arg('receiverId') receiverId: number,
      @Ctx() { req }: types.MyContext
    ): Promise<ConversationResponse> {
      return handler(async () => {
        if (receiverId === req.userId) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Unable to create conversation with yourself'
          };
        }
        const existingConversation = await Conversation.getRepository().findBy({
          members: ArrayContains([req.userId, receiverId])
        });

        if (existingConversation.length !== 0) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Conversation Exists'
          };
        }

        const conversation = await Conversation.create({
          userId: req.userId,
          receiverId,
          members: [req.userId, receiverId]
        }).save();

        if (!conversation) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Internal Server Error'
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
  return createConversation;
};

export default createConversation;
