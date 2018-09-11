declare const __DEV__: boolean;
declare const __PUBLIC_PATH__: string;
declare namespace FastClick {
  export function attach(element: HTMLElement): void;
}
interface Window {
  FastClick: typeof FastClick
}

interface Node {
  
}
