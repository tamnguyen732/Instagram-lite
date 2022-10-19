import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '~/server/entities';
import bcrypt from 'bcryptjs';
import { RegisterInput } from '~/server/types/inputs';
import { UserMutationResponse } from '~/server/types/responses/user';
import { handler } from '~/server/utils/handler';

@Resolver()
export class Register {
  @Query(() => String)
  async hello() {
    return 'string';
  }
  @Mutation((_return) => UserMutationResponse)
  async register(
    @Arg('register') { email, password, username }: RegisterInput,
  ): Promise<UserMutationResponse> {
    return handler(async () => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          code: 404,
          success: false,
          message: 'User already existed',
          errors: [
            {
              field: `${existingUser.username === username ? 'Username' : 'Email'}`,
              message: `${existingUser.username === username ? 'Username' : 'Email'} already taken`,
            },
          ],
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = User.create({
        username,
        email,
        password: hashedPassword,
      });

      await User.save(newUser);

      return {
        code: 200,
        success: true,
        message: 'you have created successfully',
        user: newUser,
      };
    });
  }
}
