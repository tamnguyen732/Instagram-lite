import { Field, ObjectType } from 'type-graphql';
import { User } from '~/server/entities';
import { BaseResponse } from './BaseResponse';

ObjectType({ implements: BaseResponse });
export class UserMutationResponse implements BaseResponse {
  code!: number;
  success!: boolean;
  message?: string;
  @Field()
  user?: User;
}
