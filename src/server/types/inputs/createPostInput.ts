import { Field, InputType } from 'type-graphql';

@InputType()
export class createPostInput {
  @Field()
  caption!: string;
  @Field()
  photo!: string;

  userId!: number;
}
