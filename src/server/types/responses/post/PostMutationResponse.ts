import { Field, ObjectType } from 'type-graphql';
import { Post } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class PostMutationResponse extends BaseResponse {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
