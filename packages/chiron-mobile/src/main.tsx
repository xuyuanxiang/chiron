import { h, render } from 'preact';

if (typeof Object.assign !== 'function' || typeof Promise === 'undefined') {
  const script: HTMLScriptElement = document.createElement('script');
  script.src = `${__PUBLIC_PATH__}polyfill.js`;
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FastClick && typeof window.FastClick.attach === 'function') {
      FastClick.attach(document.body);
    }
    setTimeout(bootstrap);
  }, false);
}

let container: Element | undefined;
let root: HTMLElement;

function bootstrap() {
  if (!root) {
    root = document.createElement('div');
    document.body.appendChild(root);
  }
  const App = require('./App').App;
  container = render(<App/>, root, container);
}

if (__DEV__) {
  if (module.hot) {
    module.hot.accept('./App', bootstrap);
  }
}
