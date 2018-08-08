import { CompileError } from './CompileError';
import { ErrorCode } from './ErrorCode';

export class AppJsNotFound extends CompileError {
  constructor(cause?: Error) {
    super(ErrorCode.APP_JS_NOT_FOUND, cause || 'app.js file was not exists.');
  }
}
