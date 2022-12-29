export enum ReactionTypes {
  LIKE = 'LIKE',
  UNLIKE = 'UNLIKE'
}

export enum FollowingTypes {
  FOLLOW = 'FOLLOW',
  UNFOLLOW = 'UNFOLLOW'
}

export type followTypeString = typeof FollowingTypes;
