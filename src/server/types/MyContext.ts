import { NextApiRequest, NextApiResponse } from 'next';

export interface MyContext {
  req: NextApiRequest & { userId: string; accessToken?: string };
  res: NextApiResponse;
}
