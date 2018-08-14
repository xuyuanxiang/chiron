import { ChironError } from './ChironError';
import { ChironErrorCode } from './ChironErrorCode';

export class AppJsNotFound extends ChironError {
  constructor(cause?: Error) {
    super(
      ChironErrorCode.APP_JS_NOT_FOUND,
      cause || 'app.js file was not exists.',
    );
  }
}
