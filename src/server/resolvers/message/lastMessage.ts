import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Message } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';

const lastMessage = (Base: ClassType) => {
  @Resolver()
  class lastMessage extends Base {
    @Query(() => String)
    async hello(): Promise<string> {
      return 'hello last message';
    }
    @UseMiddleware(verifyAuth)
    @Query(() => Message)
    async lastMessage(@Arg('conversationId') conversationId: number): Promise<Message | null> {
      const messages = await Message.find({
        where: { conversationId },
        order: { createdAt: 'DESC' }
      });

      return messages[0];
    }
  }
  return lastMessage;
};

export default lastMessage;
