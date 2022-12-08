import { BaseUserFragment } from '../../types/generated';

export interface AuthInitalState {
  currentUser: BaseUserFragment | null;
  isLoggedIn: boolean;
}
