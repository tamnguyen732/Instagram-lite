import { Field, ObjectType } from 'type-graphql';
import { BaseResponse } from '../common';

@ObjectType()
export class UploadImageResponse extends BaseResponse {
  @Field({ nullable: true })
  imageUrl!: string;
}
