/**
 * API 简单输入输出纯函数。
 */
export interface ThunkApi<Input, Output = {}> {
  name: string;

  (i: Input): Output | undefined;
}
