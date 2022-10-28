import { Field, ObjectType } from 'type-graphql';
import { User } from '~/server/entities';
import { PaginatedResponse } from '../common';

@ObjectType()
export class PaginatedUsersResponse extends PaginatedResponse {
  @Field((_type) => [User], { nullable: true })
  paginatedUsers?: User[];
}
