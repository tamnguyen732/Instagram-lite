import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ChangePassword {
  @Query(() => String)
  async login(): Promise<String> {
    return 'tam';
  }
}
