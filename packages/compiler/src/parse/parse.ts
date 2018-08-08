import { readFileSync } from 'fs';
import { resolve } from 'path';
import { readJsonSync, AppJsonNotFound, AppJsNotFound } from 'chiron-core';
import { ParseOptions } from './ParseOptions';
import { App, AppConfig } from '../ast/App';
import { AST } from '../ast/AST';
import { Program, SourceType } from '../ast/Program';
import { JsParser } from './JsParser';

export async function parse(
  { cwd = process.cwd(), encoding = 'utf8', parsers }: ParseOptions = {
    cwd: process.cwd(),
    encoding: 'utf8',
  },
): Promise<AST> {
  let appConfig: AppConfig | null;
  try {
    appConfig = readJsonSync(resolve(cwd, './app.json'), encoding);
  } catch (e) {
    throw new AppJsonNotFound(e);
  }
  if (!appConfig) {
    throw new AppJsonNotFound();
  }

  let appJs: string;
  try {
    appJs = readFileSync(resolve(cwd, './app.js'), encoding);
  } catch (e) {
    throw new AppJsNotFound(e);
  }

  if (!parsers) {
    parsers = [new JsParser()];
  }

  return {
    app: new App(appConfig, new Program(SourceType.JS, appJs, { type: 'JS' })),
  };
}
