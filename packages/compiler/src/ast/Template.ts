import { Program, SourceType } from './Program';

export class Template extends Program {
  constructor(
    start: number,
    end: number,
    sourceType: SourceType = SourceType.WXML,
  ) {
    super(sourceType, end);
    this.start = start;
  }
}
