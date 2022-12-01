import { DOMAttributes } from 'react';

export interface IconProps extends DOMAttributes<SVGSVGElement> {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export type AddParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (...args: [...Parameters<TFunction>, ...TParameters]) => ReturnType<TFunction>;
