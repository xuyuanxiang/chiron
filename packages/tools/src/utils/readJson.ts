import { readFile } from 'fs';

export async function readJson<T>(
  jsonFile: string,
  encoding: string = 'utf8',
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    readFile(jsonFile, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else if (!data || data.length === 0) {
        resolve(<T>{});
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}
