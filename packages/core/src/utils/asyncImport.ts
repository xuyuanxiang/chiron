import { isDefined } from './isDefined';
import { noop } from './noop';

export function asyncImport(src: string, done: () => void = noop): void {
  if (isDefined(window)) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = _ => done();
    const head = document.querySelector('head');
    head && head.appendChild(script);
  } else {
    import(src).then(done);
  }
}
