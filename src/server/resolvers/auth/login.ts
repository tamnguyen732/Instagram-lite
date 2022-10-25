import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import bcrypt from 'bcryptjs';
import { LoginInput } from '~/server/types/inputs';
import { UserMutationResponse } from '~/server/types/responses/user';
import { handler } from '~/server/utils';
import { generateToken, sendTokens } from '~/helpers/token';
import * as types from '~/server/types';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
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
      @Ctx() { res }: types.MyContext
    ): Promise<UserMutationResponse> {
      return handler(async () => {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          return {
            code: status.NOT_FOUND,
            success: false,
            message: 'User does not exist'
          };
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'Your password is not correct'
          };
        }

        sendTokens(res, user);
        return {
          code: status.OK,
          success: true,
          message: 'you have logged in successfully',
          user,
          accessToken: generateToken('accessToken', user)
        };
      });
    }
  }
  return Login;
};

export default login;
