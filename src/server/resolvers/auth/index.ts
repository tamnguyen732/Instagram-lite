import { Resolver } from 'type-graphql';

import combineResolvers from '~/helpers/combineResolvers';
import forgotPassword from './forgotPassword';
import login from './login';
import register from './register';

@Resolver()
export default class AuthResolver extends combineResolvers(login, register, forgotPassword) {}
