import * as wx from './wx';
import { App, getApp } from './App';
import { Page, getCurrentPages } from './Page';
import { Component } from './Component';

export function autoPolyfill() {
  window.wx = wx;
  window.App = App;
  window.getApp = getApp;
  window.Page = Page;
  window.getCurrentPages = getCurrentPages;
  window.Component = Component;
}
