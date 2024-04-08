import type { JSX, PropsWithChildren } from 'react';
import type {
  Direction,
  ItemsAlignment,
  Justification,
} from '../../helpers/tailwind.helpers';
import {
  getDirection,
  getItemsAlignment,
  getJustification,
} from '../../helpers/tailwind.helpers';

export interface BlockProps extends PropsWithChildren {
  direction?: Direction;
  justify?: Justification;
  alignItems?: ItemsAlignment;
  gap?: string;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
}

/**
 * @param gap - Класс TailwindCSS
 * @param element = Какой HTML элемент использовать в качестве базы блока
 */
export default function Block({
  direction,
  justify,
  alignItems,
  gap,
  className = '',
  element: Element = 'div',
  onClick,
  children,
}: BlockProps): JSX.Element {
  function getStyles(): string {
    return [
      'flex',
      getDirection(direction),
      getJustification(justify),
      getItemsAlignment(alignItems),
      gap,
      ...className.split(' '),
    ]
      .filter(Boolean)
      .join(' ');
  }

  return (
    <Element className={getStyles()} onClick={onClick}>
      {children}
    </Element>
  );
}
