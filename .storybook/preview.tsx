import type { JSX } from 'react';
import { Preview, Story, StoryContext, StoryFn } from '@storybook/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from '../src/stores/rootReducer';
import { createStore } from 'redux';

const store = createStore(rootReducer);

/**
  @param context.parameters.customInitialState - для изменения начального состояния store
 */

export const withReduxProvider = (
  Story: JSX.ElementType,
  context: StoryContext,
) => {
  const customInitialState = context.parameters?.customInitialState || {};
  const newStore = createStore(
    rootReducer,
    Object.assign({}, store.getState(), customInitialState),
  );
  return (
    <Provider store={newStore}>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '*',
            element: <Story {...context} />,
          },
        ])}
      />
    </Provider>
  );
};

const preview: Preview = {
  decorators: [(story: StoryFn, context) => withReduxProvider(story, context)],
};
export default preview;
