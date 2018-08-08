import { CompileError } from './CompileError';
import { ErrorCode } from './ErrorCode';

export class AppJsonNotFound extends CompileError {
  constructor(cause?: Error) {
    super(
      ErrorCode.APP_JSON_NOT_FOUND,
      cause || 'app.json file was not exists.',
    );
  }
}
