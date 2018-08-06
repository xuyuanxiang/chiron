import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, Page, View } from '@wosai/chiron-web-compat';

ReactDOM.render(
  <App><Page path="pages/index"><View>Hello</View></Page></App>,
  document.body,
);
