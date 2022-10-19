import { Secret, sign } from 'jsonwebtoken';
import { NextApiResponse } from 'next';

import { Cookies } from 'next/dist/server/web/spec-extension/cookies';
import { EXPIRES } from '~/constants/token';
import { User } from '~/server/entities';

export const generateToken = (type: string, user: User) => {
  return sign(
    {
      userId: user.id,
    },
    type === 'accessToken'
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.REFRESH_TOKEN_SECRET as Secret),
    {
      expiresIn: type === 'accessToken' ? EXPIRES.ACCESS_TOKEN : EXPIRES.REFRESH_TOKEN,
    },
  );
};

export const setRefreshToken = (res: NextApiResponse, user: User) => {
  const cookie = new Cookies();

  cookie.set(process.env.REFRESH_TOKEN_COOKIE_NAME as string, generateToken('refreshToken', user), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/refresh_token',
  });
};
