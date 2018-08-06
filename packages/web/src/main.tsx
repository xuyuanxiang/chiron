import { render, h } from 'preact';
import { App, Page, View } from '@wosai/chiron-web-compat';

const container = render(
  <App>
    <Page>
      <View>Hello</View>
    </Page>
  </App>,
  document.body,
  container,
);
