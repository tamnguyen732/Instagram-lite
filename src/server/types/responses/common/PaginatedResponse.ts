import { Field, ObjectType } from 'type-graphql';
import { BaseResponse } from './BaseResponse';

@ObjectType()
export class PaginatedResponse extends BaseResponse {
  @Field({ nullable: true })
  totalCount?: number;

  @Field(() => Number, { nullable: true })
  page?: number;

  @Field((_type) => Number, { nullable: true })
  lastPage?: number;

  @Field((_type) => Boolean, { nullable: true })
  hasMore?: boolean;
}
