import { Page } from './Page';
import { File } from './File';
import { Node } from './Node';

export type ReferenceMap = { [alias: string]: Page };
export type ComponentDependencyMap = { [tag: string]: Component };

export interface ComponentConstructorArguments {
  script: File;
  template: File;
  style?: File;
  config?: File;
  references?: ReferenceMap;
  dependencies?: ComponentDependencyMap;
}

export class Component implements Node {
  readonly type: string = 'Component';
  readonly script: File;
  readonly template: File;
  readonly style?: File;
  readonly config?: File;
  readonly references?: ReferenceMap;
  readonly dependencies?: ComponentDependencyMap;

  constructor({
    script,
    template,
    style,
    config,
    references,
    dependencies,
  }: ComponentConstructorArguments) {
    this.script = script;
    this.template = template;
    this.style = style;
    this.config = config;
    this.references = references;
    this.dependencies = dependencies;
  }
}
