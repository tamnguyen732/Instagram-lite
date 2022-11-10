import { DOMAttributes } from 'react';

export interface IconProps extends DOMAttributes<SVGSVGElement> {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}
