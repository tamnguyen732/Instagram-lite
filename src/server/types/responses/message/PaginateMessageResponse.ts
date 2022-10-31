import { Field, ObjectType } from 'type-graphql';
import { Message } from '~/server/entities';
import { PaginatedResponse } from '../common';

@ObjectType()
export class PaginatedMessageResponse extends PaginatedResponse {
  @Field(() => [Message], { nullable: true })
  paginatedMessages?: Message[];
}
