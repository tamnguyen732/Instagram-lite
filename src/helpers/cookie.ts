import { NextApiResponse } from 'next';
import cookie from 'cookie';
import { cookieConfig } from '~/config';
import { COOKIE_NAMES } from '~/constants/token';

interface Payload {
  key: string;
  value: string;
}

export const setCookie = (res: NextApiResponse, payload: Payload | Payload[]) => {
  if (Array.isArray(payload)) {
    {
      res.setHeader(
        'Set-Cookie',
        payload.map(({ key, value }) =>
          cookie.serialize(key, value, {
            ...cookieConfig,
          }),
        ),
      );
    }
  } else {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(payload.key, payload.value, {
        ...cookieConfig,
      }),
    );
  }
};

export const clearAllCookies = (res: NextApiResponse): void => {
  res.setHeader(
    'Set-Cookie',
    Object.values(COOKIE_NAMES).map((key) =>
      cookie.serialize(key, '', {
        ...cookieConfig,
        expires: new Date(0),
      }),
    ),
  );
};
