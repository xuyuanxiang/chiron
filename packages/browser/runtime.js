if (typeof window !== 'undefined') {
  const { parse } = require('querystring');
  const { search, pathname } = location;
  const app = {},
    options = { path: pathname, query: parse(search.replace('?', '')) };
  const currentPages = [];
  const appConfig = require('./app/app.json');

  let index = appConfig && appConfig.pages ? appConfig.pages[0] : null;

  if (index) {
    load(`/${index}.js`, () => {
      if (location.pathname !== `/${index}`) {
        history.pushState({}, appConfig.window.navigationBarTitleText, index);
      }
    });
  }

  if (__DEV__) {
    window.wx = require('./wx');
  } else {
    window.wx = {};
  }

  window.getApp = () => {
    return app;
  };

  window.App = hooks => {
    for (const k in hooks) {
      const temp = hooks[k];
      if (typeof temp === 'function') {
        app[k] = temp.bind(app);
      } else {
        app[k] = temp;
      }
    }
  };

  window.Page = hooks => {
    const page = {};
    for (const k in hooks) {
      const temp = hooks[k];
      if (typeof temp === 'function') {
        page[k] = temp.bind(page);
      } else {
        page[k] = temp;
      }
    }
    currentPages.push(page);
    console.log('loaded pages:', currentPages);
  };

  window.getCurrentPages = () => {
    return currentPages;
  };

  bind('load', function() {
    apply('onLaunch', [options]);
  });
  bind('error', function() {
    apply('onError', []);
  });
  bind('pageshow', function() {
    apply('onShow', [options]);
  });
  bind('pagehide', function() {
    apply('onHide', []);
  });

  function bind(event, handler) {
    window.addEventListener(event, handler, false);
  }

  function apply(method, args) {
    if (app && typeof app[method] === 'function') {
      app[method].apply(app, args);
    }
  }

  function load(src, done) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = done;
    document.querySelector('head').appendChild(script);
  }
}
