import { CookieSerializeOptions } from 'cookie';

export const cookieConfig: CookieSerializeOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};
