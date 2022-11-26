import { generateAction } from './generateAction';
export const otherPost = [
  {
    title: 'Follow',
    action: () => {},
    actionId: 'follow',
    hasConfirm: false
  },
  {
    title: 'Unfollow',
    action: () => {},
    actionId: 'unfollow',
    hasConfirm: false
  },
  {
    title: 'Add to your favorites',
    action: () => {},
    actionId: 'addFavorites',
    hasConfirm: false
  },
  {
    title: 'Remove your favorites',
    action: () => {},
    actionId: 'removeFavorites',
    hasConfirm: false
  },
  {
    title: 'Go to post',
    action: () => {},
    actionId: 'goToPost',
    hasConfirm: false
  },
  {
    title: 'Share to',
    action: () => {},
    actionId: 'share',
    hasConfirm: false
  },
  {
    title: 'Copy link',
    action: () => {},
    actionId: 'copy',
    hasConfirm: false
  },
  {
    title: 'Cancel',
    action: () => {},
    actionId: 'cancel',
    hasConfirm: false
  }
];

export const yourPost = [
  {
    title: 'Delete',
    action: () => {},
    actionId: 'delete',
    hasConfirm: false
  },
  {
    title: 'Edit',
    action: () => {},
    actionId: 'edit',
    hasConfirm: false
  },
  {
    title: 'Go to post',
    action: () => {},
    actionId: 'goToPost',
    hasConfirm: false
  },
  {
    title: 'Hide likes',
    action: () => {},
    actionId: 'hideLikes',
    hasConfirm: false
  },
  {
    title: 'Turn off comment',
    action: () => {},
    actionId: 'turnOffComment',
    hasConfirm: false
  },
  {
    title: 'Copy Link',
    action: () => {},
    actionId: 'copyLink',
    hasConfirm: false
  },
  {
    title: 'Cancel',
    action: () => {},
    actionId: 'cancel',
    hasConfirm: false
  }
];

const allAction = [...otherPost, ...yourPost];

export const addPostAction = generateAction(allAction);
