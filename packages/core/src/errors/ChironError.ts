import { ChironErrorCode } from './ChironErrorCode';

export class ChironError extends Error {
  readonly code: ChironErrorCode;

  constructor(code: ChironErrorCode, cause: Error | unknown) {
    let message, stack;
    if (typeof cause === 'string') {
      message = `${code}-${cause}`;
    } else if (cause instanceof Error) {
      message = `${code}-${cause.message}`;
      stack = cause.stack;
    }
    super(message);
    this.code = code;
    this.stack = stack;
  }
}
