import { Field, InputType } from 'type-graphql';

@InputType()
export class FollowUserInput {
  @Field()
  id!: number;
  @Field()
  type!: string;
}
