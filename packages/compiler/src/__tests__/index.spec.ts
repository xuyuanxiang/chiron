import { codeFrameColumns } from '@babel/code-frame';

const code = `<view wx:if="{{flag}}">
  <view wx:for="{{array}}">
    <text>{{item}}</text>
</view>
</view>`;

it('code frame', () => {
  console.debug('code:', code);
  const frame = codeFrameColumns(code, { start: { line: 1, column: 7 } });
  console.debug(frame);
  expect(frame).not.toBeNull();
});
