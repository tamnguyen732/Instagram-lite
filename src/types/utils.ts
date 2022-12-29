import { DOMAttributes } from 'react';

export interface IconProps extends DOMAttributes<SVGSVGElement> {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export type Callback = () => void;
export type FollowAction = 'FOLLOW' | 'UNFOLLOW';

export type AddParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (...args: [...Parameters<TFunction>, ...TParameters]) => ReturnType<TFunction>;
