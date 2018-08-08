import { ChironError } from './ChironError';
import { ChironErrorCode } from './ChironErrorCode';

export class AppJsonNotFound extends ChironError {
  constructor(cause?: Error) {
    super(
      ChironErrorCode.APP_JSON_NOT_FOUND,
      cause || 'app.json file was not exists.',
    );
  }
}
