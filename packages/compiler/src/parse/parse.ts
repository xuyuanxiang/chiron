import { resolve } from 'path';
import {
  AppJsNotFound,
  AppJsonNotFound,
  AppJsonHasCorrupted,
  assertIsFile,
  readJson,
  readFile,
} from 'chiron-core';
import { ParseOptions } from './ParseOptions';
import { App, ContentType, File, Program } from '../program';
import { WXAppConfig } from '../../../core/src/declarations/weixin/AppConfig';

export async function parse(
  { cwd = process.cwd(), encoding = 'utf8' }: ParseOptions = {
    cwd: process.cwd(),
    encoding: 'utf8',
  },
): Promise<Program> {
  const appConfigFile = resolve(cwd, './app.json');
  const appJsFile = resolve(cwd, './app.js');
  await Promise.all([
    assertIsFile(appConfigFile, AppJsonNotFound),
    assertIsFile(appJsFile, AppJsNotFound),
  ]);

  let appConfig: WXAppConfig;
  try {
    appConfig = await readJson(appConfigFile, encoding);
  } catch (e) {
    throw new AppJsonHasCorrupted(e);
  }

  console.info('app.json:', JSON.stringify(appConfig));
  // TODO detect pages

  return {
    app: new App(
      new File(
        appConfigFile,
        await readFile(appConfigFile, encoding),
        ContentType.CONFIG,
      ),
      new File(appJsFile, await readFile(appJsFile, encoding), ContentType.JS),
    ),
  };
}
