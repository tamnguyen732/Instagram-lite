import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteCommentInput {
  @Field()
  commentId!: number;
  @Field()
  userId!: number;
}
