import { ChironError } from './ChironError';
import { ChironErrorCode } from './ChironErrorCode';

export class AppJsonHasCorrupted extends ChironError {
  constructor(cause?: Error) {
    super(
      ChironErrorCode.APP_JSON_HAS_CORRUPTED,
      cause || 'app.json parse failed.',
    );
  }
}
