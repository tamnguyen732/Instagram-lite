import { Query, Resolver } from 'type-graphql';

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async login(): Promise<String> {
    return 'string';
  }
}
