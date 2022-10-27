import { Resolver } from 'type-graphql';

import combineResolvers from '~/helpers/combineResolvers';
import changePassword from './changePassword';
import forgotPassword from './forgotPassword';
import login from './login';
import logout from './logout';
import register from './register';

@Resolver()
export default class AuthResolver extends combineResolvers(
  login,
  register,
  forgotPassword,
  changePassword,
  logout
) {}
