import bcrypt from 'bcryptjs';
import { SALT_NUMBER } from '~/constants';
export const hashedData = async (data: string) => {
  const salt = await bcrypt.genSalt(SALT_NUMBER);
  return await bcrypt.hash(data, salt);
};
