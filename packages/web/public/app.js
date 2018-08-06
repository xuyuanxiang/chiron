!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o),
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 3));
})([
  function(e, t) {
    e.exports = preact;
  },
  function(e, t, n) {
    e.exports = n(6)();
  },
  function(e, t, n) {
    'use strict';
    n.r(t),
      function(e) {
        n.d(t, 'version', function() {
          return a;
        }),
          n.d(t, 'DOM', function() {
            return x;
          }),
          n.d(t, 'Children', function() {
            return T;
          }),
          n.d(t, 'render', function() {
            return v;
          }),
          n.d(t, 'createClass', function() {
            return V;
          }),
          n.d(t, 'createPortal', function() {
            return C;
          }),
          n.d(t, 'createFactory', function() {
            return j;
          }),
          n.d(t, 'createElement', function() {
            return E;
          }),
          n.d(t, 'cloneElement', function() {
            return R;
          }),
          n.d(t, 'isValidElement', function() {
            return D;
          }),
          n.d(t, 'findDOMNode', function() {
            return L;
          }),
          n.d(t, 'unmountComponentAtNode', function() {
            return _;
          }),
          n.d(t, 'Component', function() {
            return Z;
          }),
          n.d(t, 'PureComponent', function() {
            return B;
          }),
          n.d(t, 'unstable_renderSubtreeIntoContainer', function() {
            return P;
          }),
          n.d(t, 'unstable_batchedUpdates', function() {
            return Y;
          }),
          n.d(t, '__spread', function() {
            return U;
          });
        var r = n(1),
          o = n.n(r);
        n.d(t, 'PropTypes', function() {
          return o.a;
        });
        var i = n(0),
          a = '15.1.0',
          u = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(
            ' ',
          ),
          c =
            ('undefined' !== typeof Symbol &&
              Symbol.for &&
              Symbol.for('react.element')) ||
            60103,
          l =
            'undefined' !== typeof Symbol && Symbol.for
              ? Symbol.for('__preactCompatWrapper')
              : '__preactCompatWrapper',
          p = {
            constructor: 1,
            render: 1,
            shouldComponentUpdate: 1,
            componentWillReceiveProps: 1,
            componentWillUpdate: 1,
            componentDidUpdate: 1,
            componentWillMount: 1,
            componentDidMount: 1,
            componentWillUnmount: 1,
            componentDidUnmount: 1,
          },
          s = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/,
          f = {},
          d = 'undefined' !== typeof e && e.env && !1;
        function h() {
          return null;
        }
        var y = Object(i.h)('a', null).constructor;
        (y.prototype.$$typeof = c),
          (y.prototype.preactCompatUpgraded = !1),
          (y.prototype.preactCompatNormalized = !1),
          Object.defineProperty(y.prototype, 'type', {
            get: function() {
              return this.nodeName;
            },
            set: function(e) {
              this.nodeName = e;
            },
            configurable: !0,
          }),
          Object.defineProperty(y.prototype, 'props', {
            get: function() {
              return this.attributes;
            },
            set: function(e) {
              this.attributes = e;
            },
            configurable: !0,
          });
        var m = i.options.event;
        i.options.event = function(e) {
          return m && (e = m(e)), (e.persist = Object), (e.nativeEvent = e), e;
        };
        var b = i.options.vnode;
        function v(e, t, n) {
          var r = t && t._preactCompatRendered && t._preactCompatRendered.base;
          r && r.parentNode !== t && (r = null),
            !r && t && (r = t.firstElementChild);
          for (var o = t.childNodes.length; o--; )
            t.childNodes[o] !== r && t.removeChild(t.childNodes[o]);
          var a = Object(i.render)(e, t, r);
          return (
            t && (t._preactCompatRendered = a && (a._component || { base: a })),
            'function' === typeof n && n(),
            (a && a._component) || a
          );
        }
        i.options.vnode = function(e) {
          if (!e.preactCompatUpgraded) {
            e.preactCompatUpgraded = !0;
            var t = e.nodeName,
              n = (e.attributes =
                null == e.attributes ? {} : U({}, e.attributes));
            'function' === typeof t
              ? (!0 === t[l] ||
                  (t.prototype && 'isReactComponent' in t.prototype)) &&
                (e.children &&
                  '' === String(e.children) &&
                  (e.children = void 0),
                e.children && (n.children = e.children),
                e.preactCompatNormalized || A(e),
                (function(e) {
                  var t = e.nodeName,
                    n = e.attributes;
                  (e.attributes = {}),
                    t.defaultProps && U(e.attributes, t.defaultProps);
                  n && U(e.attributes, n);
                })(e))
              : (e.children &&
                  '' === String(e.children) &&
                  (e.children = void 0),
                e.children && (n.children = e.children),
                n.defaultValue &&
                  (n.value || 0 === n.value || (n.value = n.defaultValue),
                  delete n.defaultValue),
                (function(e, t) {
                  var n, r, o;
                  if (t) {
                    for (o in t) if ((n = s.test(o))) break;
                    if (n)
                      for (o in ((r = e.attributes = {}), t))
                        t.hasOwnProperty(o) &&
                          (r[
                            s.test(o)
                              ? o.replace(/([A-Z0-9])/, '-$1').toLowerCase()
                              : o
                          ] =
                            t[o]);
                  }
                })(e, n));
          }
          b && b(e);
        };
        var g = function() {};
        function P(e, t, n, r) {
          var o = v(Object(i.h)(g, { context: e.context }, t), n),
            a = o._component || o.base;
          return r && r.call(a, o), a;
        }
        function O(e) {
          P(this, e.vnode, e.container);
        }
        function C(e, t) {
          return Object(i.h)(O, { vnode: e, container: t });
        }
        function _(e) {
          var t = e._preactCompatRendered && e._preactCompatRendered.base;
          return (
            !(!t || t.parentNode !== e) &&
            (Object(i.render)(Object(i.h)(h), e, t), !0)
          );
        }
        (g.prototype.getChildContext = function() {
          return this.props.context;
        }),
          (g.prototype.render = function(e) {
            return e.children[0];
          });
        var w,
          N = [],
          T = {
            map: function(e, t, n) {
              return null == e
                ? null
                : ((e = T.toArray(e)),
                  n && n !== e && (t = t.bind(n)),
                  e.map(t));
            },
            forEach: function(e, t, n) {
              if (null == e) return null;
              (e = T.toArray(e)), n && n !== e && (t = t.bind(n)), e.forEach(t);
            },
            count: function(e) {
              return (e && e.length) || 0;
            },
            only: function(e) {
              if (1 !== (e = T.toArray(e)).length)
                throw new Error('Children.only() expects only one child.');
              return e[0];
            },
            toArray: function(e) {
              return null == e ? [] : N.concat(e);
            },
          };
        function j(e) {
          return E.bind(null, e);
        }
        for (var x = {}, S = u.length; S--; ) x[u[S]] = j(u[S]);
        function k(e) {
          var t,
            n = e[l];
          return n
            ? !0 === n
              ? e
              : n
            : ((n = V({
                displayName: (t = e).displayName || t.name,
                render: function() {
                  return t(this.props, this.context);
                },
              })),
              Object.defineProperty(n, l, { configurable: !0, value: !0 }),
              (n.displayName = e.displayName),
              (n.propTypes = e.propTypes),
              (n.defaultProps = e.defaultProps),
              Object.defineProperty(e, l, { configurable: !0, value: n }),
              n);
        }
        function E() {
          for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
          return (
            (function e(t, n) {
              for (var r = n || 0; r < t.length; r++) {
                var o = t[r];
                Array.isArray(o)
                  ? e(o)
                  : o &&
                    'object' === typeof o &&
                    !D(o) &&
                    ((o.props && o.type) ||
                      (o.attributes && o.nodeName) ||
                      o.children) &&
                    (t[r] = E(
                      o.type || o.nodeName,
                      o.props || o.attributes,
                      o.children,
                    ));
              }
            })(e, 2),
            A(i.h.apply(void 0, e))
          );
        }
        function A(e) {
          var t;
          (e.preactCompatNormalized = !0),
            (function(e) {
              var t = e.attributes || (e.attributes = {});
              (M.enumerable = 'className' in t),
                t.className && (t.class = t.className);
              Object.defineProperty(t, 'className', M);
            })(e),
            'function' !== typeof (t = e.nodeName) ||
              (t.prototype && t.prototype.render) ||
              (e.nodeName = k(e.nodeName));
          var n,
            r,
            o = e.attributes.ref,
            i = o && typeof o;
          return (
            !w ||
              ('string' !== i && 'number' !== i) ||
              (e.attributes.ref = ((n = o),
              (r = w)._refProxies[n] ||
                (r._refProxies[n] = function(e) {
                  r &&
                    r.refs &&
                    ((r.refs[n] = e),
                    null === e && (delete r._refProxies[n], (r = null)));
                }))),
            (function(e) {
              var t = e.nodeName,
                n = e.attributes;
              if (!n || 'string' !== typeof t) return;
              var r = {};
              for (var o in n) r[o.toLowerCase()] = o;
              r.ondoubleclick &&
                ((n.ondblclick = n[r.ondoubleclick]),
                delete n[r.ondoubleclick]);
              if (
                r.onchange &&
                ('textarea' === t ||
                  ('input' === t.toLowerCase() &&
                    !/^fil|che|rad/i.test(n.type)))
              ) {
                var i = r.oninput || 'oninput';
                n[i] ||
                  ((n[i] = z([n[i], n[r.onchange]])), delete n[r.onchange]);
              }
            })(e),
            e
          );
        }
        function R(e, t) {
          for (var n = [], r = arguments.length - 2; r-- > 0; )
            n[r] = arguments[r + 2];
          if (!D(e)) return e;
          var o = e.attributes || e.props,
            a = [
              Object(i.h)(
                e.nodeName || e.type,
                U({}, o),
                e.children || (o && o.children),
              ),
              t,
            ];
          return (
            n && n.length ? a.push(n) : t && t.children && a.push(t.children),
            A(i.cloneElement.apply(void 0, a))
          );
        }
        function D(e) {
          return e && (e instanceof y || e.$$typeof === c);
        }
        var M = {
          configurable: !0,
          get: function() {
            return this.class;
          },
          set: function(e) {
            this.class = e;
          },
        };
        function U(e, t) {
          for (var n = arguments, r = 1, o = void 0; r < arguments.length; r++)
            if ((o = n[r]))
              for (var i in o) o.hasOwnProperty(i) && (e[i] = o[i]);
          return e;
        }
        function I(e, t) {
          for (var n in e) if (!(n in t)) return !0;
          for (var r in t) if (e[r] !== t[r]) return !0;
          return !1;
        }
        function L(e) {
          return (e && e.base) || null;
        }
        function W() {}
        function V(e) {
          function t(e, t) {
            !(function(e) {
              for (var t in e) {
                var n = e[t];
                'function' !== typeof n ||
                  n.__bound ||
                  p.hasOwnProperty(t) ||
                  ((e[t] = n.bind(e)).__bound = !0);
              }
            })(this),
              Z.call(this, e, t, f),
              q.call(this, e, t);
          }
          return (
            (e = U({ constructor: t }, e)).mixins &&
              (function(e, t) {
                for (var n in t)
                  t.hasOwnProperty(n) &&
                    (e[n] = z(
                      t[n].concat(e[n] || N),
                      'getDefaultProps' === n ||
                        'getInitialState' === n ||
                        'getChildContext' === n,
                    ));
              })(
                e,
                (function(e) {
                  for (var t = {}, n = 0; n < e.length; n++) {
                    var r = e[n];
                    for (var o in r)
                      r.hasOwnProperty(o) &&
                        'function' === typeof r[o] &&
                        (t[o] || (t[o] = [])).push(r[o]);
                  }
                  return t;
                })(e.mixins),
              ),
            e.statics && U(t, e.statics),
            e.propTypes && (t.propTypes = e.propTypes),
            e.defaultProps && (t.defaultProps = e.defaultProps),
            e.getDefaultProps && (t.defaultProps = e.getDefaultProps.call(t)),
            (W.prototype = Z.prototype),
            (t.prototype = U(new W(), e)),
            (t.displayName = e.displayName || 'Component'),
            t
          );
        }
        function $(e, t, n) {
          if (
            ('string' === typeof t && (t = e.constructor.prototype[t]),
            'function' === typeof t)
          )
            return t.apply(e, n);
        }
        function z(e, t) {
          return function() {
            for (var n, r = arguments, o = 0; o < e.length; o++) {
              var i = $(this, e[o], r);
              if (t && null != i)
                for (var a in (n || (n = {}), i))
                  i.hasOwnProperty(a) && (n[a] = i[a]);
              else 'undefined' !== typeof i && (n = i);
            }
            return n;
          };
        }
        function q(e, t) {
          F.call(this, e, t),
            (this.componentWillReceiveProps = z([
              F,
              this.componentWillReceiveProps || 'componentWillReceiveProps',
            ])),
            (this.render = z([F, G, this.render || 'render', H]));
        }
        function F(e, t) {
          if (e) {
            var n = e.children;
            if (
              (n &&
                Array.isArray(n) &&
                1 === n.length &&
                ('string' === typeof n[0] ||
                  'function' === typeof n[0] ||
                  n[0] instanceof y) &&
                ((e.children = n[0]),
                e.children &&
                  'object' === typeof e.children &&
                  ((e.children.length = 1), (e.children[0] = e.children))),
              d)
            ) {
              var r = 'function' === typeof this ? this : this.constructor,
                i = this.propTypes || r.propTypes,
                a = this.displayName || r.name;
              i && o.a.checkPropTypes(i, e, 'prop', a);
            }
          }
        }
        function G(e) {
          w = this;
        }
        function H() {
          w === this && (w = null);
        }
        function Z(e, t, n) {
          i.Component.call(this, e, t),
            (this.state = this.getInitialState ? this.getInitialState() : {}),
            (this.refs = {}),
            (this._refProxies = {}),
            n !== f && q.call(this, e, t);
        }
        function B(e, t) {
          Z.call(this, e, t);
        }
        function Y(e) {
          e();
        }
        U((Z.prototype = new i.Component()), {
          constructor: Z,
          isReactComponent: {},
          replaceState: function(e, t) {
            for (var n in (this.setState(e, t), this.state))
              n in e || delete this.state[n];
          },
          getDOMNode: function() {
            return this.base;
          },
          isMounted: function() {
            return !!this.base;
          },
        }),
          (W.prototype = Z.prototype),
          (B.prototype = new W()),
          (B.prototype.isPureReactComponent = !0),
          (B.prototype.shouldComponentUpdate = function(e, t) {
            return I(this.props, e) || I(this.state, t);
          });
        var J = {
          version: a,
          DOM: x,
          PropTypes: o.a,
          Children: T,
          render: v,
          createClass: V,
          createPortal: C,
          createFactory: j,
          createElement: E,
          cloneElement: R,
          isValidElement: D,
          findDOMNode: L,
          unmountComponentAtNode: _,
          Component: Z,
          PureComponent: B,
          unstable_renderSubtreeIntoContainer: P,
          unstable_batchedUpdates: Y,
          __spread: U,
        };
        t.default = J;
      }.call(this, n(5));
  },
  function(e, t, n) {
    e.exports = n(4);
  },
  function(e, t, n) {
    'use strict';
    var r = (function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              var r =
                Object.defineProperty && Object.getOwnPropertyDescriptor
                  ? Object.getOwnPropertyDescriptor(e, n)
                  : {};
              r.get || r.set ? Object.defineProperty(t, n, r) : (t[n] = e[n]);
            }
        return (t.default = e), t;
      })(n(2)),
      o = n(8);
    r.render(
      preact.h(
        o.App,
        null,
        preact.h(
          o.Page,
          { path: 'pages/index' },
          preact.h(o.View, null, 'Hello'),
        ),
      ),
      document.body,
    );
  },
  function(e, t) {
    var n,
      r,
      o = (e.exports = {});
    function i() {
      throw new Error('setTimeout has not been defined');
    }
    function a() {
      throw new Error('clearTimeout has not been defined');
    }
    function u(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === i || !n) && setTimeout)
        return (n = setTimeout), setTimeout(e, 0);
      try {
        return n(e, 0);
      } catch (t) {
        try {
          return n.call(null, e, 0);
        } catch (t) {
          return n.call(this, e, 0);
        }
      }
    }
    !(function() {
      try {
        n = 'function' === typeof setTimeout ? setTimeout : i;
      } catch (e) {
        n = i;
      }
      try {
        r = 'function' === typeof clearTimeout ? clearTimeout : a;
      } catch (e) {
        r = a;
      }
    })();
    var c,
      l = [],
      p = !1,
      s = -1;
    function f() {
      p &&
        c &&
        ((p = !1), c.length ? (l = c.concat(l)) : (s = -1), l.length && d());
    }
    function d() {
      if (!p) {
        var e = u(f);
        p = !0;
        for (var t = l.length; t; ) {
          for (c = l, l = []; ++s < t; ) c && c[s].run();
          (s = -1), (t = l.length);
        }
        (c = null),
          (p = !1),
          (function(e) {
            if (r === clearTimeout) return clearTimeout(e);
            if ((r === a || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(e);
            try {
              r(e);
            } catch (t) {
              try {
                return r.call(null, e);
              } catch (t) {
                return r.call(this, e);
              }
            }
          })(e);
      }
    }
    function h(e, t) {
      (this.fun = e), (this.array = t);
    }
    function y() {}
    (o.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      l.push(new h(e, t)), 1 !== l.length || p || u(d);
    }),
      (h.prototype.run = function() {
        this.fun.apply(null, this.array);
      }),
      (o.title = 'browser'),
      (o.browser = !0),
      (o.env = {}),
      (o.argv = []),
      (o.version = ''),
      (o.versions = {}),
      (o.on = y),
      (o.addListener = y),
      (o.once = y),
      (o.off = y),
      (o.removeListener = y),
      (o.removeAllListeners = y),
      (o.emit = y),
      (o.prependListener = y),
      (o.prependOnceListener = y),
      (o.listeners = function(e) {
        return [];
      }),
      (o.binding = function(e) {
        throw new Error('process.binding is not supported');
      }),
      (o.cwd = function() {
        return '/';
      }),
      (o.chdir = function(e) {
        throw new Error('process.chdir is not supported');
      }),
      (o.umask = function() {
        return 0;
      });
  },
  function(e, t, n) {
    'use strict';
    var r = n(7);
    function o() {}
    e.exports = function() {
      function e(e, t, n, o, i, a) {
        if (a !== r) {
          var u = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((u.name = 'Invariant Violation'), u);
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
      };
      return (n.checkPropTypes = o), (n.PropTypes = n), n;
    };
  },
  function(e, t, n) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  function(e, t, n) {
    'use strict';
    n.r(t),
      n.d(t, 'App', function() {
        return o;
      }),
      n.d(t, 'Page', function() {
        return i;
      }),
      n.d(t, 'View', function() {
        return u;
      });
    var r = n(2),
      o = function(e) {
        var t = e.children;
        return r.Children.only(t);
      },
      i = function(e) {
        var t = e.children;
        e.path;
        return r.Children.only(t);
      };
    function a(e, t) {
      if (null == e) return {};
      var n,
        r,
        o = (function(e, t) {
          if (null == e) return {};
          var n,
            r,
            o = {},
            i = Object.keys(e);
          for (r = 0; r < i.length; r++)
            (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
          return o;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++)
          (n = i[r]),
            t.indexOf(n) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (o[n] = e[n]));
      }
      return o;
    }
    var u = function(e) {
      var t = e.children,
        n = e.tagName,
        o = void 0 === n ? 'div' : n,
        i = a(e, ['children', 'tagName']);
      return Object(r.createElement)(o, i, t);
    };
    u.defaultProps = { tagName: 'div' };
  },
]);
