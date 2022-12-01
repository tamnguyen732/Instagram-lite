import { Secret, sign } from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import { COOKIE_NAMES, EXPIRES } from '~/constants';
import { User } from '~/server/entities';

import { setCookie } from './cookie';

export const generateToken = (type: string, user: User) => {
  return sign(
    {
      userId: user.id
    },
    type === 'accessToken'
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.REFRESH_TOKEN_SECRET as Secret),
    {
      expiresIn: type === 'accessToken' ? EXPIRES.ACCESS_TOKEN : EXPIRES.REFRESH_TOKEN
    }
  );
};

export const sendAccessToken = (res: NextApiResponse, user: User) => {
  const accessToken = generateToken('accessToken', user);

  const token = {
    key: COOKIE_NAMES.ACCESS_TOKEN,
    value: accessToken
  };
  setCookie(res, token);
  return accessToken;
};

export const sendTokens = (res: NextApiResponse, user: User) => {
  const accessToken = generateToken('accessToken', user);
  const refreshToken = generateToken('refreshToken', user);

  const tokens = [
    {
      key: COOKIE_NAMES.ACCESS_TOKEN,
      value: accessToken
    },
    {
      key: COOKIE_NAMES.REFRESH_TOKEN,
      value: refreshToken
    }
  ];

  setCookie(res, tokens);
};
