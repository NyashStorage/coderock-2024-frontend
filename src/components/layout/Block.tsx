import '../../assets/styles/components/block/_default.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface BlockProps extends PropsWithChildren {
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  justify?:
    | 'normal'
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: string;
}

export default function Block({
  direction = 'row',
  justify = 'center',
  alignItems = 'center',
  gap = '0',
  children,
}: BlockProps): JSX.Element {
  return (
    <div
      className={`flex flex-${direction} justify-${justify} items-${alignItems} gap-${gap}`}
    >
      {children}
    </div>
  );
}
