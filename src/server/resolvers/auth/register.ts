import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '~/server/entities';
import bcrypt from 'bcryptjs';
import { RegisterInput } from '~/server/types/inputs';

@Resolver()
export default class Register {
  @Query(() => String)
  async hello() {
    return 'string';
  }
  @Mutation(() => User)
  async register(
    @Arg('register') { username, password, email }: RegisterInput,
  ): Promise<User | null> {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return null;
        // return {
        //   code: 404,
        //   success: false,
        //   message: 'User already existed',
        // };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = User.create({
        username,
        email,
        password: hashedPassword,
      });

      await User.save(newUser);
      return newUser;

      // return {
      //   code: 200,
      //   success: true,
      //   user: newUser,
      // };
    } catch (error) {
      console.log(error);
      return null;
      // return {
      //   code: 400,
      //   success: true,
      //   message: 'Internal Error',
      // };
    }
  }
}
