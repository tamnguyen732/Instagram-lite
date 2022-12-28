// types

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useFollowUserMutation, UserFragment } from '~/types/generated';
import { useAuthSelector } from '~/redux/selector';
import { useStoreDispatch } from '~/redux/store';
import { authAction } from '~/redux/slices/authSlice';
import { Callback, FollowAction } from '~/types/utils';

type FollowUser = (action: FollowAction, actionDone?: Callback) => Promise<void>;

interface UseFollowUserReturn {
  isFollowed: boolean;
  followUserLoading: boolean;
  currentUser: UserFragment;
  followUser: FollowUser;
  showUnfollowModal: () => void;
  handleFollowActions: (actionDone?: Callback) => void;
}

export const useFollowUser = (selectedUser: UserFragment): UseFollowUserReturn => {
  const { showModal } = useModalContext();
  const currentUser = useAuthSelector().currentUser!;

  const [followUserMutate, { loading: followUserLoading }] = useFollowUserMutation();
  const dispatch = useStoreDispatch();

  const isFollowed = selectedUser.followers.some((follower) => follower._id === currentUser._id);

  const followUser: FollowUser = async (action, actionDone) => {
    if (followUserLoading) return;

    const isFollow = action === 'follow';
    const followType = isFollow ? 'FOLLOW' : 'UNFOLLOW';

    const response = await followUserMutate({
      variables: { FollowUserInput: { type: followType, id: +selectedUser.id } }
    });

    if (!response.data?.followUser.success) return;

    if (actionDone != null) actionDone();

    dispatch(
      authAction.followUser({
        user: selectedUser,
        followType
      })
    );
  };

  const showUnfollowModal = () => {
    if (!isFollowed) return;

    showModal(MODAL_TYPES.UNFOLLOW);
    dispatch(authAction.setSelectedUser(selectedUser));
  };

  const handleFollowActions = (actionDone?: Callback) => {
    if (isFollowed) showUnfollowModal();
    else followUser('follow', actionDone);
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
