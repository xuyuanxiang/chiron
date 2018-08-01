import { Node } from './Node';
import { Program } from './Program';

export class File implements Node {
  type: string = 'File';
  start: number = 0;
  end: number;

  program: Program;

  constructor(program: Program) {
    this.program = program;
    this.end = program.end;
  }
}
