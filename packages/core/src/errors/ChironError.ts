import { ChironErrorCode } from './ChironErrorCode';

export class ChironError extends Error {
  readonly code: ChironErrorCode;

  constructor(code: ChironErrorCode, cause: Error | unknown) {
    let message, stack, name;
    if (typeof cause === 'string') {
      message = `${code}-${cause}`;
    } else if (cause instanceof Error) {
      message = `${code}-${cause.message}`;
      stack = cause.stack;
      name = cause.name;
    }
    super(message);
    this.code = code;
    this.name = name || 'SyntaxError';
    this.stack = stack;
  }
}
