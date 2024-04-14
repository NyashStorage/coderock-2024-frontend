import '../../assets/styles/components/card/index.scss';
import type { JSX } from 'react';
import type { BlockProps } from './Block';
import Block from './Block';

export default function Card({ className, ...props }: BlockProps): JSX.Element {
  function getStyles(): string {
    const styles = ['card'];
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  return <Block className={getStyles()} {...props}></Block>;
}
