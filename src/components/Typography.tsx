import type { JSX, PropsWithChildren } from 'react';

export interface TypographyProps extends PropsWithChildren {
  variant?: 'h1' | 'h2' | 'h3' | 'body';
}

/**
 * Компонент для тестирования текста в Storybook.
 */
export default function Typography({
  variant = 'body',
  children,
}: TypographyProps): JSX.Element {
  if (variant === 'body') return <>{children}</>;

  const Element = variant;
  return <Element>{children}</Element>;
}
