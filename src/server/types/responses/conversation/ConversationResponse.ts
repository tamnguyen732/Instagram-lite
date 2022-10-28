import { Field, ObjectType } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class ConversationResponse extends BaseResponse {
  @Field({ nullable: true })
  conversation?: Conversation;
}
