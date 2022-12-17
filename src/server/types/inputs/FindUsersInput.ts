import { Field, InputType } from 'type-graphql';

@InputType()
export class FindUsersInput {
  @Field()
  limitPerPage!: number;
  @Field()
  page!: number;
  @Field()
  searchQuery!: string;
}
