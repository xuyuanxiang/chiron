import { Location } from './Location';

export interface AST {
  readonly type: string;
  location: Location;
  parent?: AST;
  children?: AST[];

  [propName: string]: any;
}
