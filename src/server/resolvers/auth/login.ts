import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import bcrypt from 'bcryptjs';
import { LoginInput } from '~/server/types/inputs';
import { UserMutationResponse } from '~/server/types/responses/user';
import { handler } from '~/server/utils/handler';
import { generateToken, sendTokens } from '~/helpers/token';
import { MyContext } from '~/server/types';
import { verifyAuth } from '~/server/middlewares';

const login = (Base: ClassType) => {
  @Resolver()
  class Login extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => String)
    async hello() {
      return 'hello world';
    }
    @Mutation((_return) => UserMutationResponse)
    async login(
      @Arg('login') { username, password }: LoginInput,
      @Ctx() { res }: MyContext,
    ): Promise<UserMutationResponse> {
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

        sendTokens(res, user);
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
  return Login;
};

export default login;
