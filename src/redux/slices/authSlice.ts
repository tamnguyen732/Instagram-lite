import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AuthInitalState, toRegisterUser } from '~/redux/types/auth';
import { BaseUserFragment } from '~/types/generated';

const initialState: AuthInitalState = {
  toVerifyUser: { email: '', password: '', username: '' },
  currentUser: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<BaseUserFragment>) {
      state.currentUser = action.payload;
    },
    setToVerifyUser(state, action: PayloadAction<toRegisterUser>) {
      state.toVerifyUser = action.payload;
    },

    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
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
