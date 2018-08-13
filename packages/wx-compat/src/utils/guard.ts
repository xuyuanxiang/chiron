import { noop, WxApiOptions, WxApiOptionsEnsured } from 'chiron-core';

/**
 * 警戒函数，处理微信小程序API调用参数中回到函数：success，fail，complete未定义的情况
 */
export function guard<T extends WxApiOptions>(
  options: T = <T>{},
): T & WxApiOptionsEnsured {
  const { success = noop, fail = noop, complete = noop } = options;
  return Object.assign(options, { success, fail, complete });
}
