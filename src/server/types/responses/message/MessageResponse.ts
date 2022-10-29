import { Field, ObjectType } from 'type-graphql';
import { Message } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class MessageResponse extends BaseResponse {
  @Field({ nullable: true })
  newMessage?: Message;
}
