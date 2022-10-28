import { Resolver } from 'type-graphql';
import combineResolvers from '~/helpers/combineResolvers';
import followUser from './followUser';
import getSingleUser from './getSingleUser';
import getUsers from './getUsers';
import uploadAvatar from './uploadAvatar';
@Resolver()
export default class UserResolver extends combineResolvers(
  followUser,
  getSingleUser,
  getUsers,
  uploadAvatar
) {}
