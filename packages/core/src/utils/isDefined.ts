import { isUndefined } from 'lodash-es';

export function isDefined(o: any): boolean {
  return !isUndefined(o);
}
