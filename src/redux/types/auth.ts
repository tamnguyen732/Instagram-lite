import { BaseUserFragment, UserFragment } from '../../types/generated';

export interface toRegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface AuthInitalState {
  toVerifyUser: toRegisterUser;
  currentUser: UserFragment | null;
  isLoggedIn: boolean;
}
