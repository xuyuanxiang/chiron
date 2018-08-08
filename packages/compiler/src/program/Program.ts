import { App } from './App';
import { Page } from './Page';
import { Package } from './Package';
import { Component } from './Component';

export interface Program {
  app?: App;
  pages?: Page[];
  subpackages?: Package[];
  components?: Component[];
}
