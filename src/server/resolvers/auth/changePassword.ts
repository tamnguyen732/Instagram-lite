import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ForgotPasswordResolver {
  @Query(() => String)
  async login(): Promise<String> {
    return 'tam';
  }
}
