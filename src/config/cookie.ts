import { CookieSerializeOptions } from 'cookie';

export const cookieConfig: CookieSerializeOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 60 * 60 * 60
};
