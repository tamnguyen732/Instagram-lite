import { Field, ObjectType } from 'type-graphql';
import { BaseResponse } from './BaseResponse';
import { FieldError } from './FieldError';

@ObjectType()
export class MutationResponse extends BaseResponse {
  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field({ nullable: true })
  accessToken?: string;
}
