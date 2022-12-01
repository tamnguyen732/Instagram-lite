import { Resolver, ClassType, Query, UseMiddleware, Ctx } from 'type-graphql';
import { User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { GetSessionResponse } from '~/server/types/responses/auth';
import { handler } from '~/server/utils';

// types

const getSession = (Base: ClassType) => {
  @Resolver()
  class GetSession extends Base {
    @Query((_returns) => GetSessionResponse)
    @UseMiddleware(verifyAuth)
    getSession(@Ctx() { req }: types.MyContext): Promise<GetSessionResponse> {
      return handler(async () => {
        const accessToken = req.cookies.access_token;

        const user = await User.findOneBy({ id: req.userId });
        return {
          code: 200,
          success: true,
          user,
          accessToken
        };
      });
    }
  }

  return GetSession;
};

export default getSession;
