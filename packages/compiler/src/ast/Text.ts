import { AST } from './AST';
import { Location } from './Location';

export class Text implements AST {
  readonly type: string = 'Text';
  readonly raw: string;
  location: Location;

  constructor(raw: string, location: Location) {
    this.raw = raw;
    this.location = location;
  }
}
