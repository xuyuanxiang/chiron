import { noop, isString } from 'chiron-core';
import { Options, OptionsEnsured } from './weixin';

/**
 * 对微信小程序API的优化：
 *   无需考虑回调函数及回调格式，简单输入输出纯函数。
 */
export interface ThunkApi<Input, Output = {}> {
  name: string;

  (i: Input): Output | undefined;
}

/**
 * 对微信小程序API的优化：
 *   无需考虑回调函数及回调格式，async函数/返回Promise类型函数。
 */
export interface PromiseApi<Input, Output = {}> {
  name: string;

  (i: Input): Promise<Output> | undefined;
}

/**
 * 微信小程序实际的API
 */
export interface ActualApi<Input> {
  (options: Input): void;
}

export interface ExecuteCompleteCallback<Output> {
  (reason?: Error | string | null, res?: Output): void;
}

/**
 * 警戒函数，处理微信小程序API调用参数中回到函数：success，fail，complete未定义的情况
 */
export function guard<T extends Options>(
  options: T = <T>{},
): T & OptionsEnsured {
  const { success = noop, fail = noop, complete = noop } = options;
  return Object.assign(options, { success, fail, complete });
}

/**
 * 将ThunkApi以及PromiseApi类型的API 转化为 微信实际的API。
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
export function build<Input extends Options, Output = {}>(
  api: ThunkApi<Input, Output> | PromiseApi<Input, Output>,
): ActualApi<Input> {
  return function(actual: Input): void {
    const { success, fail, complete } = guard(actual);
    execute(api, actual, (reason, res) => {
      if (reason) {
        let error;
        if (isString(reason)) {
          error = reason;
        } else if (reason && reason.message) {
          error = reason.message;
        }
        const result = Object.assign({
          errMsg: [`${api.name}:fail`, error || ''].join(' '),
        });
        fail(result);
        complete(result);
        return;
      }
      const result = Object.assign({ errMsg: `${api.name}:ok` }, res || {});
      success(result);
      complete(result);
    });
  };
}

/**
 * 执行ThunkApi以及PromiseApi类型的API，取出返回结果。
 */
function execute<Input, Output = {}>(
  api: ThunkApi<Input, Output> | PromiseApi<Input, Output>,
  options: Input,
  done: ExecuteCompleteCallback<Output>,
) {
  try {
    const rtn: Output | Promise<Output> | undefined = api(options);
    if (!rtn) {
      done();
    } else if (rtn instanceof Promise) {
      rtn.then(res => done(null, res)).catch(reason => done(reason));
    } else {
      done(null, rtn);
    }
  } catch (e) {
    done(e);
  }
}
