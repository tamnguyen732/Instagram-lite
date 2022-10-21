import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePostInput {
  @Field()
  caption!: string;
  @Field()
  photo!: string;
  @Field()
  postId!: number;
  @Field()
  userId!: number;
}
