import { BaseUserFragment } from '../../types/generated';

export interface toRegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface AuthInitalState {
  toVerifyUser: toRegisterUser;
  currentUser: BaseUserFragment | null;
  isLoggedIn: boolean;
}
