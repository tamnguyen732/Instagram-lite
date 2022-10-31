import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Message } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import { BaseResponse } from '~/server/types/responses/common';
import status from 'http-status';
const seenMessage = (Base: ClassType) => {
  @Resolver()
  class seenMessage extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello last message';
    }
    @UseMiddleware(verifyAuth)
    @Mutation(() => BaseResponse)
    async seenMessage(@Arg('messageId') messageId: number): Promise<BaseResponse> {
      Message.createQueryBuilder()
        .update(Message)
        .set({ seen: true })
        .where('id =:id', { id: messageId })
        .execute();

      return {
        code: status.OK,
        success: true
      };
    }
  }
  return seenMessage;
};

export default seenMessage;
