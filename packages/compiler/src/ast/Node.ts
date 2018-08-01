export interface Node {
  start: number;
  end: number;
  type: string;

  [prop: string]: any;
}
