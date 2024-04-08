import type { JSX } from 'react';
import Block from './components/layout/Block';

export default function App(): JSX.Element {
  return (
    <Block direction="flex-col">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Block>
  );
}
