import { Node } from './Node';
import { Page } from './Page';
import { File } from './File';

export interface ComponentConfig {
  component: boolean;
  usingComponents?: { [alias: string]: string };
}

export type ReferenceMap = { [alias: string]: Page };

export class Component implements Node {
  readonly type: string = 'Component';
  readonly config: ComponentConfig;
  readonly references?: ReferenceMap;
  readonly files: File[];

  constructor(
    config: ComponentConfig,
    files: File[],
    references?: ReferenceMap,
  ) {
    this.config = config;
    this.files = files;
    this.references = references;
  }
}
