import { access, stat } from 'fs';

export interface ErrorConstructor {
  new (...args: any[]): Error;
}

export async function assertFileExists(
  file: string,
  Error: ErrorConstructor,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    access(file, err => {
      if (err) {
        reject(new Error(err));
      } else {
        resolve();
      }
    });
  });
}

export async function assertIsFile(
  file: string,
  Error: ErrorConstructor,
): Promise<void> {
  await assertFileExists(file, Error);

  return new Promise<void>((resolve, reject) => {
    stat(file, (err, stats) => {
      if (err) {
        reject(new Error(err));
      } else if (!stats.isFile()) {
        reject(new Error(`${file} not exists.`));
      } else {
        resolve();
      }
    });
  });
}
