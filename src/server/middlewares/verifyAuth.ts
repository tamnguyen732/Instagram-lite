import jwt from 'jsonwebtoken';
import { clearAllCookies } from '~/helpers/cookie';
import { User } from '../entities';
import { SECRETS } from '~/constants';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
import { AuthenticationError } from 'apollo-server-core';

interface JwtPayloadSigned extends jwt.JwtPayload {
  userId: string;
}

export const verifyAuth: MiddlewareFn<MyContext> = async ({ context: { req, res } }, next) => {
  const { access_token, refresh_token } = req.cookies;
  const { ACCESS_TOKEN, REFRESH_TOKEN } = SECRETS;

  if (!ACCESS_TOKEN || !REFRESH_TOKEN) throw new Error('Missing secret token');

  if (!access_token || !refresh_token)
    return {
      code: 401,
      success: false,
      message: 'Token is missing'
    };

  try {
    const { userId } = jwt.verify(access_token, ACCESS_TOKEN) as JwtPayloadSigned;

    const user = await User.findOneBy({ id: parseInt(userId) });

    if (!user)
      return {
        code: 404,
        success: false,
        message: 'User not found'
      };

    req.userId = userId;

    return next();
  } catch (error) {
    clearAllCookies(res);
    throw new AuthenticationError(`Error authenticating user ${JSON.stringify(error)}`);
  }
};
