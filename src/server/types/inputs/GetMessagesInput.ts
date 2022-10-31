import { Field, InputType } from 'type-graphql';

@InputType()
export class GetMessagesInput {
  @Field()
  limitPerPage!: number;
  @Field()
  page!: number;
  @Field()
  conversationId!: number;
}
