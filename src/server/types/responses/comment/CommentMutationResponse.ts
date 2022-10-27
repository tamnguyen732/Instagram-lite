import { Field, ObjectType } from 'type-graphql';
import { Comment } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class CommentMutationResponse extends BaseResponse {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
