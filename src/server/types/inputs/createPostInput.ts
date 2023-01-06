import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
  @Field()
  caption!: string;
  @Field()
  imageBase64!: string;
  @Field()
  location?: string;
  @Field()
  userId!: number;
}
