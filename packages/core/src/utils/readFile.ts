import { readFile as read } from 'fs';

export async function readFile(file: string, encoding: string = 'utf8'): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    read(file, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
