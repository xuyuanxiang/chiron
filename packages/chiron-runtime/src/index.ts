import createHistory from 'history/createBrowserHistory';
import { parse } from 'url';

const history = createHistory();

history.listen(capture);

document.addEventListener('DOMContentLoaded', capture, false);

Object.defineProperty(window.history, 'forward', {
  get() {
    return history.goForward;
  },
});
Object.defineProperty(window.history, 'go', {
  get() {
    return history.go;
  },
});
Object.defineProperty(window.history, 'back', {
  get() {
    return history.goBack;
  },
});
Object.defineProperty(window.location, 'href', {
  configurable: true,
  set(val) {
    if (typeof val === 'string') {
      const { path, host, hostname, protocol } = parse(val);
      if (
        typeof path === 'string' &&
        path.length &&
        protocol === window.location.protocol &&
        host === window.location.host &&
        hostname === window.location.hostname
      ) {
        console.log('location.href=', val, 'history push:', path);
        history.push(path);
      }
    }
  },
});
Object.defineProperty(window.location, 'pathname', {
  set(val) {
    if (typeof val === 'string' && val.length) {
      console.log('location.pathname=', val, 'history push:', val);
      history.push(val);
    }
  },
});
Object.defineProperty(window.location, 'replace', {
  get() {
    return function(val: any) {
      if (typeof val === 'string' && val.length) {
        console.log('location.replace(', val, ') history replace:', val);
        history.replace(val);
      }
    };
  },
});
Object.defineProperty(window.location, 'reload', {
  get() {
    return function() {
      const { path } = parse(location.href);
      if (typeof path === 'string') {
        console.log('location.reload(), history replace:', path);
        history.replace(path);
      }
    };
  },
});

function capture() {
  const links = document.querySelectorAll('a');
  if (links && typeof links.forEach === 'function') {
    links.forEach(link => {
      if (typeof link.href === 'string') {
        const path = parse(link.href).path;
        if (typeof path === 'string' && path.length) {
          link.href = 'javascript:void(0);';
          link.addEventListener(
            'click',
            function() {
              history.push(path);
            },
            false,
          );
        }
      }
    });
  }
}
