import { BaseResponse } from '../types/responses/common';
import status from 'http-status';
import { ReactionTypes } from '../types/responses/common';

type ReactionType = (params: {
  entity: any;
  id: number;
  userId: number;
  entityName: string;
  reaction?: string;
}) => Promise<BaseResponse>;

export const getReaction: ReactionType = async ({
  entity: Entity,
  id,
  userId,
  entityName,
  reaction
}) => {
  const reactItem = await Entity.findOne({ where: { id } });
  if (!reactItem) {
    return {
      code: status.BAD_REQUEST,
      success: false,
      message: ` ${reactItem} Not Found`
    };
  }
  const isLiked = reactItem!.reactions?.includes(userId);

  let query = Entity.createQueryBuilder().update(Entity).where('id = :id', { id });

  if (ReactionTypes.LIKE === reaction) {
    if (isLiked) {
      return {
        code: status.BAD_REQUEST,
        success: true,
        message: `You already liked this ${entityName} `
      };
    } else {
      query = query
        .set({
          reactions: () => `array_append("reactions", ${userId})`
        })
        .execute();
      return {
        code: status.OK,
        success: true,
        message: `You just liked this ${entityName}`
      };
    }
  }

  query = query
    .set({
      reactions: () => `array_remove("reactions", ${userId})`
    })
    .execute();
  return {
    code: status.OK,
    success: true,
    message: `You have unliked this ${entityName}`
  };
};
