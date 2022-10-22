import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
  @Field()
  caption!: string;
  @Field()
  photo!: string;
  @Field()
  userId!: number;
}
