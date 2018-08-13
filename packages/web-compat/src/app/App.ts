import { Component, RenderableProps, ComponentChild } from 'preact';
import { AppProps } from './app-props';

export interface AppState {
  loading: boolean;
  stacks: string[];
}

export interface AppContext {
  path: string;
  query: { [key: string]: any };
  currentPages: string[];
}

export class App extends Component<AppProps, AppState> {
  getChildContext(): AppContext {
    return {
      path: location.pathname,
      query: {},
      currentPages: this.state.stacks,
    };
  }

  state: AppState = {
    loading: false,
    stacks: [],
  };

  componentWillMount() {
    window.addEventListener('popstate', this.handlePopState.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  handlePopState(event: PopStateEvent) {
    console.log('window popstate:', event);
  }

  render({ children }: RenderableProps<AppProps>): ComponentChild {
    if (!Array.isArray(children)) {
      return null;
    }
    return children.filter(
      child =>
        child &&
        typeof child === 'object' &&
        child.attributes &&
        child.attributes.hasOwnProperty('path') &&
        child.attributes.path === location.pathname,
    )[0];
  }
}

export default App;
