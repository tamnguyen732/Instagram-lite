import { BaseEntity } from 'typeorm';
import { BaseResponse, ReactEntities } from '../types/responses/common';

type ReactionType = (params: {
  entity: ((new () => ReactEntities) & typeof BaseEntity) | ReactEntities;
  id: number;
  userId: number;
  EntityType: string;
}) => Promise<BaseResponse>;

export const getReaction: ReactionType = async ({ entity: Entity, id, userId, EntityType }) => {
  return {
    code: 200,
    success: true
  };
};
