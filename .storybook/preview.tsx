import { JSX } from 'react';
import type { Preview, StoryContext } from '@storybook/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const withRouter = (Story: JSX.ElementType, _: StoryContext) => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '*',
          element: <Story />,
        },
      ])}
    />
  );
};

export const parameters: Preview = {};
