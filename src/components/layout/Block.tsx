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
  htmlFor?: string;
}

export default function Block({
  direction,
  justify,
  alignItems,
  gap,
  className = '',
  element: Element = 'div',
  onClick,
  htmlFor,
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

  const additionalProps = Element === 'label' ? { htmlFor: htmlFor } : {};

  return (
    <Element className={getStyles()} onClick={onClick} {...additionalProps}>
      {children}
    </Element>
  );
}
