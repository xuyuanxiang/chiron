import { accessSync, statSync } from 'fs';
import { AppJsonNotFound } from '../errors';

export interface ErrorConstructor {
  new (...args: any[]): Error;
}

assertFileExists('', AppJsonNotFound);

export function assertFileExists(file: string, Error: ErrorConstructor) {
  try {
    accessSync(file);
  } catch (cause) {
    throw new Error(cause);
  }
}

export function assertIsFile(
  file: string,
  Error: ErrorConstructor,
): void | never {
  assertFileExists(file, Error);

  if (!statSync(file).isFile()) {
    throw new Error(`${file} not exists.`);
  }
}
