import { Field, ObjectType } from 'type-graphql';
import { Post } from '~/server/entities';
import { BaseResponse } from '../common';

@ObjectType()
export class PostResponse extends BaseResponse {
  @Field({ nullable: true })
  post?: Post;
}
