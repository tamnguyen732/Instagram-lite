import { Field, ObjectType } from 'type-graphql';
import { Conversation } from '~/server/entities';
import { PaginatedResponse } from '../common';

@ObjectType()
export class PaginatedConversationResponse extends PaginatedResponse {
  @Field(() => [Conversation], { nullable: true })
  paginatedConversations?: Conversation[];
}
