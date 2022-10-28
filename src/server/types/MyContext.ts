import { NextApiRequest, NextApiResponse } from 'next';

export interface MyContext {
  req: NextApiRequest & { userId: number; accessToken?: string };
  res: NextApiResponse;
}
