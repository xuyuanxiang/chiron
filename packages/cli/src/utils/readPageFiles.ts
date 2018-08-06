import { existsSync } from 'fs';
import { join } from 'path';
import { readJsonSync } from './readJsonSync';

export interface ReadPageFilesOptions {
  cwd: string;
  root: string;
  extensions: {
    script: string;
    template: string;
    style: string;
    config: string;
  };
}

export interface ReadPageResult {
  script: string;
  template: string;
  style?: string;
  config?: { [key: string]: any };
}

export async function readPageFiles(
  path: string,
  {
    cwd = process.cwd(),
    root = '/',
    extensions = {
      script: '.js',
      template: '.wxml',
      style: '.wxss',
      config: '.json',
    },
  }: ReadPageFilesOptions = {
    cwd: process.cwd(),
    root: '/',
    extensions: {
      script: '.js',
      template: '.wxml',
      style: '.wxss',
      config: '.json',
    },
  },
): Promise<ReadPageResult> {
  const script = join(cwd, root, `${path}${extensions.script}`);
  const template = join(cwd, root, `${path}${extensions.template}`);
  const style = join(cwd, root, `${path}${extensions.style}`);
  const json = join(cwd, root, `${path}${extensions.config}`);

  if (!existsSync(script)) {
    throw new Error(`${script} not exists.`);
  }

  if (!existsSync(template)) {
    throw new Error(`${template} not exists.`);
  }

  let config;
  if (existsSync(json)) {
    config = readJsonSync(json);
  }

  return { script, template, config, style };
}
