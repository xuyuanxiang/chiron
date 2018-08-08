import { ErrorCode } from './ErrorCode';

export class CompileError extends Error {
  readonly code: ErrorCode;

  constructor(code: ErrorCode, cause: Error | unknown) {
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
