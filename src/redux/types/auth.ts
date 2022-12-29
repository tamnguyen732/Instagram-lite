import { FollowingTypes } from '~/server/types/responses/common';
import { FollowTypes, UserFragment } from '../../types/generated';

export interface toRegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface authInitalState {
  toVerifyUser: toRegisterUser;
  currentUser: UserFragment | null;
  selectedUser: UserFragment | null;
  suggestedUser: UserFragment[] | [];
  isLoggedIn: boolean;
}

export interface followUserInput {
  user: UserFragment;
  type: FollowTypes;
}
