import { bindWindow, asyncImport, apply } from './utils';

if (typeof window !== 'undefined') {
  const { parse } = require('querystring');
  const { search, pathname } = location;
  const app = {},
    options = { path: pathname, query: parse(search.replace('?', '')) };
  const currentPages = [];
  const appConfig = require('../web/app/app.json');

  let index = appConfig && appConfig.pages ? appConfig.pages[0] : null;

  if (index) {
    asyncImport(`/${index}.js`, () => {
      if (location.pathname !== `/${index}`) {
        history.pushState({}, appConfig.window.navigationBarTitleText, index);
      }
    });
  }

  const vendor = process.env.CHIRON_VENDOR || 'wx';
  if (__DEV__) {
    window[vendor] = require('./wx-compat');
  } else {
    window[vendor] = {};
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
  };

  window.getCurrentPages = () => {
    return currentPages;
  };

  bindWindow('load', function () {
    apply(app, 'onLaunch', [options]);
  });
  bindWindow('error', function () {
    apply(app, 'onError', []);
  });
  bindWindow('pageshow', function () {
    apply(app, 'onShow', [options]);
  });
  bindWindow('pagehide', function () {
    apply(app, 'onHide', []);
  });
}
