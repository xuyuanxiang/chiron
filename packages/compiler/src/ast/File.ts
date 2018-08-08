import { Node } from './Node';
import { Program } from './Program';

export type DependencyMap = { [relativePath: string]: File };

export class File implements Node {
  readonly type: string = 'File';
  readonly id: string;
  readonly filename: string;
  readonly dependencies: DependencyMap;
  readonly program: Program;

  constructor(
    id: string,
    filename: string,
    dependencies: DependencyMap,
    program: Program,
  ) {
    this.id = id;
    this.filename = filename;
    this.dependencies = dependencies;
    this.program = program;
  }
}
