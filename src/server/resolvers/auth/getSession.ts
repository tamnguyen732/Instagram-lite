import { Resolver, ClassType, Query, UseMiddleware, Ctx } from 'type-graphql';
import { User } from '~/server/entities';
import { verifyAuth } from '~/server/middlewares';
import * as types from '~/server/types';
import { GetSessionResponse } from '~/server/types/responses/auth';
import status from 'http-status';
// types

const getSession = (Base: ClassType) => {
  @Resolver()
  class GetSession extends Base {
    @Query((_returns) => GetSessionResponse)
    @UseMiddleware(verifyAuth)
    async getSession(@Ctx() { req }: types.MyContext): Promise<GetSessionResponse> {
      const accessToken = req.cookies.access_token;

      const user = await User.findOneBy({ id: req.userId });
      if (!user) {
        return {
          code: status.NOT_FOUND,
          success: false,
          message: 'User Not Found'
        };
      }

      return {
        code: status.OK,
        success: true,
        user,
        accessToken
      };
    }
  }

  return GetSession;
};

export default getSession;
