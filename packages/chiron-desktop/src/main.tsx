if (__DEV__ || typeof fetch !== 'function' || typeof Object.assign !== 'function' || typeof Promise === 'undefined') {
  const script: HTMLScriptElement = document.createElement('script');
  script.async = false;
  script.src = `${__PUBLIC_PATH__}polyfill.js`;
  script.onload = function() {
    alert('polyfill loaded');
  };
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    if (window.FastClick && typeof window.FastClick.attach === 'function') {
      FastClick.attach(document.body);
    }
    bootstrap();
  }, false);
}

function bootstrap() {
  const root = document.getElementById('root');
  alert(root);
}

if (__DEV__) {
  if (module.hot) {

  }
}
