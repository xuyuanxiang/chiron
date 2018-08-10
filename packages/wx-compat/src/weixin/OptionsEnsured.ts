import { SuccessCallback } from './SuccessCallback';
import { FailCallback } from './FailCallback';
import { CompleteCallback } from './CompleteCallback';

export interface OptionsEnsured {
  success: SuccessCallback;
  fail: FailCallback;
  complete: CompleteCallback;
}
