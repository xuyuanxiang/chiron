export interface Location {
  startOffset: number;
  endOffset: number;
  start: { line: number; column: number };
  end?: { line: number; column: number };
}
