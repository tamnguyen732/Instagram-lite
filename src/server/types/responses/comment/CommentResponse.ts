import { Field, ObjectType } from 'type-graphql';
import { Comment } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class CommentResponse extends BaseResponse {
  @Field({ nullable: true })
  comment?: Comment;
}
