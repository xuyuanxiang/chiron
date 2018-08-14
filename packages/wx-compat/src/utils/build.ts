import { WxApiOptions, ThunkApi, PromiseApi, WxApi } from 'chiron-core';
import { guard } from './guard';
import { execute } from './execute';

/**
 * 将ThunkApi以及PromiseApi类型的API 转化为 WxApi。
 *
 * @example
 * ```js
 * // thunk api
 * const redirectTo = build(function redirectTo({url}) {
 *  history.pushState(null, null, url);
 * });
 *
 * redirectTo({
 *  url: 'pages/me',
 *  success(res) {
 *     // 调用成功：
 *     console.log(res); // { errMsg: 'redirectTo:ok' };
 *  },
 *  fail(res) {
 *    // 调用失败：
 *    console.log(res); // { errMsg: 'redirectTo:fail page "pages/me" is not found.'}
 *  },
 *  complete(res) {
 *    // 调用成功 或 失败：
 *    console.log(res); // { errMsg: 'redirectTo:ok' }  or  { errMsg: 'redirectTo:fail page "pages/me" is not found.'}
 *  }
 * });
 *
 * // promise api
 * const doSomething = build(async function() {
 *     // ... await logic();
 *     return { foo: 'bar' };
 * });
 *
 * doSomething({
 *  success(res) {
 *    console.log(res); // { errMsg: 'doSomething:ok', foo: 'bar' };
 *  }
 * });
 * ```
 */
export function build<Input extends WxApiOptions, Output = {}>(
  api: ThunkApi<Input, Output> | PromiseApi<Input, Output>,
): WxApi<Input> {
  return function(actual: Input): void {
    const { success, fail, complete } = guard(actual);
    execute(api, actual, (reason, res) => {
      if (reason) {
        let error;
        if (typeof reason === 'string') {
          error = reason;
        } else if (reason && reason.message) {
          error = reason.message;
        }
        const result = { errMsg: [`${api.name}:fail`, error || ''].join(' ') };
        fail(result);
        complete(result);
        return;
      }
      const result =
        typeof res === 'object'
          ? Object.assign(res, { errMsg: `${api.name}:ok` })
          : { errMsg: `${api.name}:ok` };
      success(result);
      complete(result);
    });
  };
}
