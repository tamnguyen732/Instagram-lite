import { Field, ObjectType } from 'type-graphql';
import { User } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class UserResponse extends BaseResponse {
  @Field({ nullable: true })
  user?: User;
}
