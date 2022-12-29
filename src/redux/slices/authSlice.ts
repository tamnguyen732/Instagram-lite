import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { authInitalState, followUserInput, toRegisterUser } from '~/redux/types/auth';
import { FollowTypes, UserFragment } from '~/types/generated';

const initialState: authInitalState = {
  toVerifyUser: { email: '', password: '', username: '' },
  currentUser: null,
  selectedUser: null,
  suggestedUser: [],
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserFragment>) {
      state.currentUser = action.payload;
    },
    setToVerifyUser(state, action: PayloadAction<toRegisterUser>) {
      state.toVerifyUser = action.payload;
    },

    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<UserFragment>) {
      state.selectedUser = action.payload;
    },
    setSuggesstedUsers(state, action: PayloadAction<UserFragment[]>) {
      state.suggestedUser = action.payload;
    },

    followUser(state, { payload: { user, type } }: PayloadAction<followUserInput>) {
      const currentUser = state.currentUser;

      const selectedUser = state.selectedUser;
      if (!currentUser || !selectedUser) return;
      if (type === FollowTypes.Follow) {
        state.currentUser?.following?.push(selectedUser!);
      } else {
        currentUser.following = currentUser.following?.filter(
          (currentUser) => currentUser.id !== user.id
        );
      }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      return {
        ...state,
        ...payload.auth
      };
    }
  }
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
