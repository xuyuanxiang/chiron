/**
 * API async函数/返回Promise类型函数。
 */
export interface PromiseApi<Input, Output = {}> {
  name: string;

  (i: Input): Promise<Output> | undefined;
}
