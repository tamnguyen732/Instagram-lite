import { Field, ObjectType } from 'type-graphql';
import { Post } from '~/server/entities';
import { PaginatedResponse } from '../common';

@ObjectType()
export class PaginatedPostsResponse extends PaginatedResponse {
  @Field((_type) => [Post], { nullable: true })
  paginatedPosts?: Post[];
}
