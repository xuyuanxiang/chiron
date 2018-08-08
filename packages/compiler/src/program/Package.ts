import { Node } from './Node';
import { Page } from './Page';

export class Package implements Node {
  readonly type: string = 'Package';
  readonly root: string;
  readonly pages: Page[];

  constructor(root: string, pages: Page[]) {
    this.root = root;
    this.pages = pages;
  }
}
