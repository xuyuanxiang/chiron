import * as React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('src/app/App.ts', () => {
  it('render', () => {
    const ele = shallow(<App>
      <div/>
    </App>);
    expect(ele.is('div')).toBeTruthy();
  })
});
