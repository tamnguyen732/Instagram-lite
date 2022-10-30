import { Conversation, Message, Post, User } from '~/server/entities';

type Paginate = (params: {
  entity: any;
  limitPerPage: number;
  page: number;
  userId?: number;
}) => Promise<ReturnProps>;
type ReturnProps = {
  totalCount: number;
  lastPage: number;
  entities: Post[] | User[] | Conversation[];
};
export const paginate: Paginate = async ({ entity: Entity, limitPerPage, page, userId }) => {
  let totalCount;
  if (userId) {
    totalCount = await Entity.count({ where: { userId } });
  } else {
    totalCount = await Entity.count();
  }

  const lastPage = Math.ceil(totalCount / limitPerPage);

  if (page > lastPage) {
    throw new Error('This Page Not Found');
  }

  let query = Entity.createQueryBuilder('Entity')
    .take(limitPerPage)
    .skip((page - 1) * limitPerPage);
  if (Entity === Conversation) {
    query = query

      .leftJoinAndSelect('Entity.messages', 'messages')
      .where('Entity.userId =:userId', { userId });
    const currentMessage = await Message.findOne({ where: { receiverMessageId: userId } });
    if (currentMessage) {
      query = query.orWhere('Entity.receiverId =:id', { id: userId });
    }
  }

  if (Entity === Message) {
    query = query
      .orderBy('Entity.createdAt', 'ASC')
      .where('Entity.userId =:userId', { userId: userId });
  }

  if (Entity === Post) {
    query = query
      .orderBy('Entity.createdAt', 'DESC')
      .leftJoinAndSelect('Entity.comments', 'comments');
  }

  if (userId && Entity === Post) {
    query = query.where('Entity.userId =:userId', { userId: userId });
  }

  const entities = await query.getMany();

  return { totalCount, lastPage, entities };
};
