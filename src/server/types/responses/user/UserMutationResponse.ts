import { Field, ObjectType } from 'type-graphql';
import { User } from '~/server/entities';
import { MutationResponse } from '../common';

@ObjectType()
export class UserMutationResponse extends MutationResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field({ nullable: true })
  accessToken?: string;
}
