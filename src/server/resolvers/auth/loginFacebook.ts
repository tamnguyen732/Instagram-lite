import { Mutation, Arg, Ctx, Resolver, ClassType } from 'type-graphql';
import { sendTokens } from '~/helpers/token';
import { UserMutationResponse } from '~/server/types/responses/user';
import { handler } from '~/server/utils';
import * as types from '~/server/types';
import { FacebookLoginResponse } from '~/server/types/responses/auth/loginFacebookResponse';
import { User } from '~/server/entities';
const loginFacebook = (Base: ClassType) => {
  @Resolver()
  class LoginFacebook extends Base {
    @Mutation((_returns) => UserMutationResponse)
    loginFacebook(
      @Arg('accessToken') accessToken: string,
      @Arg('userId') userId: string,
      @Ctx() { res }: types.MyContext
    ): Promise<UserMutationResponse> {
      const urlGraphFacebook = `https://graph.facebook.com/v12.0/${userId}/?fields=id,name,email,picture.type(large)&access_token=${accessToken}`;

      return handler(async () => {
        const data = await fetch(urlGraphFacebook)
          .then((res) => res.json())
          .then((data: FacebookLoginResponse) => data);
        let existingUser = await User.createQueryBuilder()
          .where('email=:email', { email: data.email })
          .andWhere('account =:account', { account: 'facebook' })
          .getOne();
        if (!existingUser) {
          const newUser = User.create({
            email: data.email,
            username: data.name,
            avatar: data.picture.data.url,
            password: '',
            account: 'facebook'
          });
          await User.save(newUser);
          existingUser = newUser;
        }
        sendTokens(res, existingUser!);

        return {
          code: 200,
          success: true,
          message: 'Logged in successfully'
        };
      });
    }
  }

  return LoginFacebook;
};

export default loginFacebook;
