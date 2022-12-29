// types

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { FollowTypes, useFollowUserMutation, UserFragment } from '~/types/generated';
import { useAuthSelector } from '~/redux/selector';
import { useStoreDispatch } from '~/redux/store';
import { authAction } from '~/redux/slices/authSlice';
import { Callback, FollowAction } from '~/types/utils';
import { useEffect, useState } from 'react';

type FollowUser = (action: FollowAction, actionDone?: Callback) => Promise<void>;

interface UseFollowUserReturn {
  isFollowed: boolean | undefined;
  followUserLoading: boolean;
  currentUser: UserFragment | null;
  followUser: FollowUser;
  showUnfollowModal: () => void;
  handleFollowActions: (actionDone?: Callback) => void;
}

export const useFollowUser = (selectedUser: UserFragment): UseFollowUserReturn => {
  const { showModal } = useModalContext();
  const { currentUser } = useAuthSelector();
  const [followUserMutate, { loading: followUserLoading }] = useFollowUserMutation();
  const dispatch = useStoreDispatch();

  const isFollowed = currentUser?.following?.some((user) => user?.id === selectedUser?.id);

  const followUser: FollowUser = async (action, callBack) => {
    if (followUserLoading) return;

    const isFollow = action === 'FOLLOW';
    const followType = isFollow ? FollowTypes.Follow : FollowTypes.Unfollow;
    try {
      const response = await followUserMutate({
        variables: { id: +selectedUser.id, type: followType }
      });

      if (!response.data?.followUser.success) return;

      if (callBack) callBack();

      dispatch(
        authAction.followUser({
          user: selectedUser,
          type: followType
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const showUnfollowModal = () => {
    if (!isFollowed) return;

    showModal(MODAL_TYPES.UNFOLLOW);
  };

  const handleFollowActions = (callBack?: Callback) => {
    if (isFollowed) showUnfollowModal();
    else followUser('FOLLOW', callBack);
  };

  return {
    isFollowed,
    followUserLoading,
    currentUser,
    followUser,
    showUnfollowModal,
    handleFollowActions
  };
};
