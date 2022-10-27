import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateCommentInput {
  @Field()
  text!: string;
  @Field()
  commentId!: number;

  @Field()
  userId!: number;
}
