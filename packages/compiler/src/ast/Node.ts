export interface Node {
  readonly type: string;

  readonly [prop: string]: any;
}
