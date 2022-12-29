import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { User } from '~/types/generated';
import { userInitalState } from '../types/user';

const initialState: userInitalState = {
  users: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      return {
        ...state,
        ...payload.user
      };
    }
  }
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
