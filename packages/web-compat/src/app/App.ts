import { FunctionalComponent, RenderableProps, h } from 'preact';
import { AppProps } from './app-props';

export const App: FunctionalComponent<AppProps> = ({
  children,
}: RenderableProps<AppProps>) => h('div', null, [children]);

export default App;
