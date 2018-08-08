import { Node } from './Node';
import { File } from './File';

export class App implements Node {
  readonly type: string = 'App';
  readonly config: File;
  readonly script: File;

  constructor(config: File, script: File) {
    this.config = config;
    this.script = script;
  }
}
