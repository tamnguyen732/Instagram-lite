import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '~/server/entities';
import bcrypt from 'bcryptjs';
import { LoginInput } from '~/server/types/inputs';
import { UserMutationResponse } from '~/server/types/responses/user';
import { handler } from '~/server/utils/handler';
import { generateToken } from '~/helpers/token';

@Resolver()
export class Login {
  @Query(() => String)
  async hello() {
    return 'string';
  }
  @Mutation((_return) => UserMutationResponse)
  async login(@Arg('login') { username, password }: LoginInput): Promise<UserMutationResponse> {
    return handler(async () => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return {
          code: 404,
          success: false,
          message: 'User does not exist',
        };
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return {
          code: 404,
          success: true,
          message: 'Your password is not correct',
        };
      }

      // setRefreshToken(res, user);
      return {
        code: 200,
        success: true,
        message: 'you have logged in successfully',
        user,
        accessToken: generateToken('accessToken', user),
      };
    });
  }
}
