import { readJsonSync, AppJsonNotFound, AppJsNotFound } from 'chiron-core';
import { ParseOptions } from './ParseOptions';
import { App, Program, File, ContentType } from '../program';
import { AppConfig } from '../shared/AppConfig';

export async function parse(
  { cwd = process.cwd(), encoding = 'utf8' }: ParseOptions = {
    cwd: process.cwd(),
    encoding: 'utf8',
  },
): Promise<Program> {
  return {};
}
