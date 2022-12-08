import { Field, ObjectType } from 'type-graphql';

// entities
import { User } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class GetSessionResponse extends BaseResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;
  @Field(() => String, { nullable: true })
  accessToken?: string;
}
