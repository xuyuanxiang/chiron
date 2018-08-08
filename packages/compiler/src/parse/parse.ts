import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ParseOptions } from './ParseOptions';
import { App, AppConfig } from '../ast/App';
import { readJsonSync } from '../util/readJsonSync';
import { AST } from '../ast/AST';
import { Program, SourceType } from '../ast/Program';
import { AppJsonNotFound } from '../error/AppJsonNotFound';
import { AppJsNotFound } from '../error/AppJsNotFound';

export async function parse(
  { parser, cwd = process.cwd(), encoding = 'utf8' }: ParseOptions = {
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

  if (!parser) {
    const { SimpleParser } = await import('./SimpleParser');
    parser = new SimpleParser();
  }

  return {
    app: new App(appConfig, new Program(SourceType.JS, appJs)),
    pages: null,
    components: null,
  };
}
