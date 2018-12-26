export enum Framework {
  React,
  Vue,
}

export enum Extension {
  js,
  jsx,
  ts,
  tsx,
  vue,
  css,
  less,
  html,
  png,
  jpeg,
  jpg,
  gif,
  ico,
}

export enum Position {
  pre, // head
  post, // body
}

export interface Resource {
  uri: string;
  ext: Extension;
  order: number;
  position: Position;
  dependOn?: Resource[];
}

export interface Route {
  path: string;
  label: string;
  resource: Resource;
}

export class Project {
  name: string;
  version: string;
  framework: Framework = Framework.React;
  description?: string;
  entry?: string;
  dependencies?: Resource[];
  routes?: Route[];

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }
}
