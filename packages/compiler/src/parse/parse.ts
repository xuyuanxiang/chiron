import { resolve } from 'path';
import { readFileSync } from 'fs';
import {
  AppJsNotFound,
  AppJsonNotFound,
  AppJsonHasCorrupted,
  assertIsFile,
  readJsonSync,
} from 'chiron-core';
import { ParseOptions } from './ParseOptions';
import { App, ContentType, File, Program } from '../program';
import { AppConfig } from '../shared/AppConfig';

export async function parse(
  { cwd = process.cwd(), encoding = 'utf8' }: ParseOptions = {
    cwd: process.cwd(),
    encoding: 'utf8',
  },
): Promise<Program> {
  const appConfigFile = resolve(cwd, './app.json');
  assertIsFile(appConfigFile, AppJsonNotFound);
  const appJsFile = resolve(cwd, './app.js');
  assertIsFile(appConfigFile, AppJsNotFound);

  let appConfig: AppConfig | null;

  try {
    appConfig = readJsonSync(appConfigFile, encoding);
  } catch (e) {
    throw new AppJsonHasCorrupted(e);
  }

  if (appConfig == null) {
    throw new AppJsonHasCorrupted();
  }

  // TODO detect pages

  return {
    app: new App(
      new File(
        appConfigFile,
        readFileSync(appConfigFile, encoding),
        ContentType.CONFIG,
      ),
      new File(appJsFile, readFileSync(appJsFile, encoding), ContentType.JS),
    ),
  };
}
