import { AST } from './AST';
import { Location } from './Location';

export class Mustache implements AST {
  readonly type: string = 'Mustache';
  readonly expression: string;
  location: Location;

  constructor(expression: string, location: Location) {
    this.expression = expression;
    this.location = location;
  }
}
