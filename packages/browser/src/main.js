import { Store } from 'svelte/store';
// import Store from 'svelte-dev-store';
import { parse as queryParse } from 'querystring';
import { parse as urlParse } from 'url';
import App from './App.html';

function noop() {}

window.onpopstate = function(event) {
  console.info('popstate=', event);
};

function parse(url = location.href) {
  const { pathname, search } = urlParse(url);
  return { path: pathname, query: queryParse(search) };
}

const { path, query } = parse();

class ChironStore extends SvelteDevStore {
  navigateTo({
    url,
    data,
    title,
    success = noop,
    fail = noop,
    complete = noop,
  }) {
    history.pushState(data, title, url);
    const { navigationStack } = this.get();
    navigationStack.push(url);
    this.set({
      options: parse(url),
      navigationStack,
    });
    success();
    complete();
  }

  reLaunch({ url, success = noop, fail = noop, complete = noop }) {
    history.replaceState(null, null, url);
    this.set({
      options: parse(url),
      navigationStack: [url],
    });
    success();
    complete();
  }

  redirectTo({
    url,
    data,
    title,
    success = noop,
    fail = noop,
    complete = noop,
  }) {
    history.replaceState(data, title, url);
    const { navigationStack } = this.get();
    if (navigationStack.length > 0) {
      navigationStack.splice(navigationStack.length - 1, 1, url);
    } else {
      navigationStack.push(url);
    }
    this.set({
      options: parse(url),
      navigationStack,
    });
    success();
    complete();
  }

  navigateBack(delta) {
    let step;
    if (typeof delta === 'number') {
      step = Math.abs(delta);
    } else {
      step = 1;
    }
    if (step > history.length) {
      step = history.length;
    }
    console.info('navigateBack:', -step);
    history.go(-step);
    const { navigationStack } = this.get();
    const last = navigationStack.length - step;
    const stack = navigationStack.slice(0, last);
    this.set({
      options: parse(stack[stack.length - 1]),
      navigationStack: stack,
    });
  }
}

const store = (window.__CHIRON = new Store({
  options: { path, query },
  navigationStack: path !== '/' ? [path] : [],
  pages: ['pages/index/index', 'pages/logs/logs'],
  workflow: {
    qr_wap_pay: {
      SHOP: {
        SELL_CARD: 'pages/index/index',
      },
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
}));

console.info('store=', store);

if (location.pathname === '/') {
  store.reLaunch({ url: 'pages/index/index' });
}

store.navigateBack(20);

const app = (window.__CHIRON_APP = new App({
  target: document.body,
  store,
}));

export default app;
