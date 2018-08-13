import { WxApiCallbackArgument } from 'chiron-core';
import { build } from '../build';

describe('wx-compat/utils/build', () => {
  it('should transform thunk api to weixin api', done => {
    const doSomething = build(function doSomething() {
      return { foo: 'bar' };
    });

    doSomething({
      success: (res: WxApiCallbackArgument) => {
        expect(res.errMsg).toBe('doSomething:ok');
        expect(res.foo).toBe('bar');
        done();
      },
    });
  });

  it('should transform promise api to weixin api', () => {
    const foo = build(async function foo() {
      return { foo: 'bar' };
    });
    const bar = build(function bar() {
      return new Promise(resolve => {
        resolve({ bar: 'foo' });
      });
    });

    foo({
      success: (res: WxApiCallbackArgument) => {
        expect(res.errMsg).toBe('foo:ok');
        expect(res.foo).toBe('bar');
        bar({
          success: (res: WxApiCallbackArgument) => {
            expect(res.errMsg).toBe('bar:ok');
            expect(res.bar).toBe('foo');
          },
        });
      },
    });
  });
});
