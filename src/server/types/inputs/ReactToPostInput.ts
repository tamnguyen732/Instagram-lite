import { Field, InputType } from 'type-graphql';

@InputType()
export class ReactToPostInput {
  @Field()
  id!: number;
}
