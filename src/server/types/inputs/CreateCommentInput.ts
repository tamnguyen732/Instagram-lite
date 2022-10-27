import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  postId!: number;
  @Field()
  text!: string;
}
