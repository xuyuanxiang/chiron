import { Node } from './Node';
import { Program } from './Program';

export class File implements Node {
  type: string = 'File';
  start: number = 0;
  end: number;
  filename: string;

  program: Program;

  constructor(filename: string, program: Program) {
    this.filename = filename;
    this.program = program;
    this.end = program.end;
  }
}
