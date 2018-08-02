import { resolve } from 'path';
import { readJsonSync } from '../utils/readJsonSync';
import { readPageFiles } from '../utils/readPageFiles';

interface AppConfig {
  pages: string[];
}

export async function compile(): Promise<void> {
  const context = process.cwd();
  const appConfig: AppConfig | undefined = readJsonSync(
    resolve(context, './app.json'));
  if (appConfig && Array.isArray(appConfig.pages)) {
    for (const page of appConfig.pages) {
      console.info('begin compile:', page);
      const files = await readPageFiles(page);
      console.info('files:', files.script);
    }
  }
}
