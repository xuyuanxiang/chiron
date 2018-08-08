import { ReactNode, StatelessComponent, Children } from 'react';
import { AppProps } from './app-props';

export const App: StatelessComponent<AppProps> = ({children}: AppProps & { children?: ReactNode }) => Children.only(children);

export default App;