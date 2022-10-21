import { Field, InputType } from 'type-graphql';

@InputType()
export class DeletePostInput {
  @Field()
  postId!: number;
  @Field()
  userId!: number;
}
