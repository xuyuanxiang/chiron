import { PromiseApi, ThunkApi } from 'chiron-core';

export interface ExecuteCompleteCallback<Output> {
  (reason?: Error | string | null, res?: Output): void;
}

/**
 * 执行ThunkApi以及PromiseApi类型的API，取出返回结果。
 */
export function execute<Input, Output = {}>(
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
