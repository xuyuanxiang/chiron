declare const __DEV__: boolean;
declare const __PUBLIC_PATH__: string;
declare namespace FastClick {
  export function attach(element: HTMLElement): void;
}

interface Window {
  FastClick: typeof FastClick
}

interface NodeModule {
  hot: {
    accept: (js: string, callback: Function) => void
  };
}

declare module 'react-hot-loader' {

  export function hot(module:NodeModule): <T>(arg: T) => T;

  interface ReactHotLoader {
    preact(arg: any): void;
  }

  const reactHotLoader: ReactHotLoader;
  export default reactHotLoader;

}
