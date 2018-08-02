!function(t) {
  var e = {};

  function n(r) {
    if (e[r]) return e[r].exports;
    var i = e[r] = { i: r, l: !1, exports: {} };
    return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
  }

  n.m = t, n.c = e, n.d = function(t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
  }, n.r = function(t) {
    'undefined' != typeof Symbol && Symbol.toStringTag &&
    Object.defineProperty(t, Symbol.toStringTag,
      { value: 'Module' }), Object.defineProperty(t, '__esModule',
      { value: !0 });
  }, n.t = function(t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, 'default',
      { enumerable: !0, value: t }), 2 & e && 'string' !=
    typeof t) for (var i in t) n.d(r, i,
      function(e) {return t[e];}.bind(null, i));
    return r;
  }, n.n = function(t) {
    var e = t && t.__esModule
      ? function() {return t.default;}
      : function() {return t;};
    return n.d(e, 'a', e), e;
  }, n.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = '', n(n.s = 0);
}([
  function(t, e, n) {t.exports = n(3);},
  function(t, e, n) {}, ,
  function(t, e, n) {
    'use strict';

    function r() {}

    function i(t, e) {
      for (var n in e) t[n] = e[n];
      return t;
    }

    function o(t, e) {e.appendChild(t);}

    function s(t) {return document.createElement(t);}

    function a(t) {return document.createTextNode(t);}

    n.r(e);

    function u(t) {
      this.destroy = r, this.fire('destroy'), this.set = r, this._fragment.d(
        !1 !== t), this._fragment = null, this._state = {};
    }

    function f(t, e) {
      return t != t ? e == e : t !== e || t && 'object' == typeof t ||
        'function' == typeof t;
    }

    function c(t, e) {
      var n = t in this._handlers && this._handlers[t].slice();
      if (n) for (var r = 0; r < n.length; r += 1) {
        var i = n[r];
        if (!i.__calling) try {
          i.__calling = !0, i.call(this, e);
        } finally {i.__calling = !1;}
      }
    }

    function h() {return this._state;}

    function l(t, e) {
      t._handlers = Object.create(
        null), t._bind = e._bind, t.options = e, t.root = e.root ||
        t, t.store = e.store || t.root.store;
    }

    function _(t, e) {
      var n = this._handlers[t] || (this._handlers[t] = []);
      return n.push(e), {
        cancel: function() {
          var t = n.indexOf(e);
          ~t && n.splice(t, 1);
        },
      };
    }

    function d(t) {t();}

    function p(t) {
      this._set(i({}, t)), this.root._lock ||
      (this.root._lock = !0, g(this.root._beforecreate), g(
        this.root._oncreate), g(this.root._aftercreate), this.root._lock = !1);
    }

    function m(t) {
      var e = this._state, n = {}, r = !1;
      for (var o in t) this._differs(t[o], e[o]) && (n[o] = r = !0);
      r && (this._state = i(i({}, e), t), this._recompute(n,
        this._state), this._bind &&
      this._bind(n, this._state), this._fragment && (this.fire('state',
        { changed: n, current: this._state, previous: e }), this._fragment.p(n,
        this._state), this.fire('update',
        { changed: n, current: this._state, previous: e })));
    }

    function g(t) {for (; t && t.length;) t.shift()();}

    function v(t, e) {
      this._fragment[this._fragment.i ? 'i' : 'm'](t, e || null);
    }

    var b = {
      destroy: u,
      get: h,
      fire: c,
      on: _,
      set: p,
      _recompute: r,
      _set: m,
      _mount: v,
      _differs: f,
    };
    n(1);

    function y(t) {
      l(this, t), this._state = i({},
        t.data), this._intro = !!t.intro, this._fragment = function(t, e) {
        var n, r, i, u, f;
        return {
          c() {
            n = s('h1'), r = a('Hello '), i = a(e.name), u = a(
              '!'), n.className = 'svelte-i7qo5m';
          },
          m(t, e) {
            !function(t, e, n) {e.insertBefore(t, n);}(n, t, e), o(r, n), o(i,
              n), o(u, n), f = !0;
          },
          p(t, e) {t.name && (i.data = e.name);},
          i(t, e) {f || this.m(t, e);},
          o: d,
          d(t) {t && function(t) {t.parentNode.removeChild(t);}(n);},
        };
      }(0, this._state), t.target &&
      (this._fragment.c(), this._mount(t.target, t.anchor)), this._intro = !0;
    }

    i(y.prototype, b);
    const j = new y({ target: document.body, data: { name: 'text' } });
    window.app = j;
    e.default = j;
  }]);
