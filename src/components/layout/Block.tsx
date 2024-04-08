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
  element?: keyof JSX.IntrinsicElements;
}

/**
 * @param direction
 * @param justify
 * @param alignItems
 * @param gap - Класс TailwindCSS
 * @param element = Какой HTML элемент использовать в качестве базы блока
 * @param children
 */
export default function Block({
  direction,
  justify,
  alignItems,
  gap = 'gap-0',
  element: Element = 'div',
  children,
}: BlockProps): JSX.Element {
  return (
    <Element
      className={`flex ${getDirection(direction)} ${getJustification(justify)} ${getItemsAlignment(alignItems)} ${gap}`}
    >
      {children}
    </Element>
  );
}