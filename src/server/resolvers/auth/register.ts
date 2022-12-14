import { Arg, ClassType, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~/server/entities';
import bcrypt from 'bcryptjs';
import { RegisterInput } from '~/server/types/inputs';
import { UserMutationResponse } from '~/server/types/responses/user';
import { handler } from '~/server/utils';
import { verifyAuth } from '~/server/middlewares';
import status from 'http-status';
import { Code } from '~/server/models/Code';
import { sendTokens } from '~/helpers/token';
import * as types from '~/server/types';

const register = (Base: ClassType) => {
  @Resolver()
  class Register extends Base {
    @UseMiddleware(verifyAuth)
    @Query(() => String)
    async hello() {
      return 'string';
    }
    @Mutation((_return) => UserMutationResponse)
    async register(
      @Arg('register') { email, password, username, verifyCode }: RegisterInput,
      @Ctx() { res }: types.MyContext
    ): Promise<UserMutationResponse> {
      return handler(async () => {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            message: 'User already existed',
            errors: [
              {
                field: `${existingUser.username === username ? 'Username' : 'Email'}`,
                message: `${
                  existingUser.username === username ? 'Username' : 'Email'
                } already taken`
              }
            ]
          };
        }

        const codeRecord = await Code.findOne({ email });
        if (!codeRecord) {
          return {
            code: status.NOT_FOUND,
            success: false,
            errors: [{ field: 'Register', message: 'Code Not Found, Try Again!' }]
          };
        }
        if (codeRecord!.code !== verifyCode) {
          return {
            code: status.BAD_REQUEST,
            success: false,
            errors: [{ field: 'Register', message: 'Wrong Code, You can press send code again' }]
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = User.create({
          username,
          email,
          password: hashedPassword
        });

        sendTokens(res, newUser);
        await User.save(newUser);
        return {
          code: status.CREATED,
          success: true,
          message: 'you have created user successfully',
          user: newUser
        };
      });
    }
  }
  return Register;
};

export default register;
