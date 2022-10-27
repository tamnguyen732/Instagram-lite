import { ClassType, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { clearAllCookies } from '~/helpers/cookie';
import * as types from '~/server/types';
import { BaseResponse } from '~/server/types/responses/common';
import { handler } from '~/server/utils';
import status from 'http-status';
const logout = (Base: ClassType) => {
  @Resolver()
  class Logout extends Base {
    @Query(() => String)
    async hello() {
      return 'hello';
    }
    @Mutation(() => BaseResponse)
    logout(@Ctx() { res }: types.MyContext): Promise<BaseResponse> {
      return handler(async () => {
        clearAllCookies(res);
        return Promise.resolve({
          code: status.OK,
          success: true,
          message: 'You have logged out successfully'
        });
      });
    }
  }

  return Logout;
};

export default logout;
