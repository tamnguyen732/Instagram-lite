import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Store, StoreDispatch, RootState } from '~/redux/types/store';
import { combinedReducers } from './reducer';
import { nextReduxCookieMiddleware } from 'next-redux-cookie-wrapper';
const subTree = { selectedPost: '' };
export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [subTree.selectedPost]
        })
      )
  });

export const wrapper = createWrapper<Store>(makeStore);

export const useStoreDispatch = () => useDispatch<StoreDispatch>();

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
