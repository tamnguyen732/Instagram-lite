import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ForgotPassword {
  @Query(() => String)
  async login(): Promise<String> {
    return 'tam';
  }
}
