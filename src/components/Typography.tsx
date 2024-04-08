import type { JSX, PropsWithChildren } from 'react';

export interface TypographyProps extends PropsWithChildren {
  variant?: 'h1' | 'h2' | 'h3' | 'body';
}

/**
 * Компонент исключительно для тестирования текста в Storybook,
 * в других случаях необходимо использовать &lt;h1&gt; и т.п.
 */
export default function Typography({
  variant = 'body',
  children,
}: TypographyProps): JSX.Element {
  if (variant === 'body') return <>{children}</>;

  const Element = variant;
  return <Element>{children}</Element>;
}
