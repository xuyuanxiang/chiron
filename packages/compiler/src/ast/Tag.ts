import { AST } from './AST';
import { Location } from './Location';

export interface TagAttribute {
  name: string;
  value: any;
}

export class Tag implements AST {
  readonly type: string = 'Tag';
  readonly name: string;
  readonly attributes: TagAttribute[];
  location: Location;

  constructor(
    name: string,
    location: Location,
    attributes: TagAttribute[] = [],
  ) {
    this.name = name;
    this.location = location;
    this.attributes = attributes;
  }
}
