import { WXMLParser } from '../WXMLParser';
import { ContentType } from '../../../program';

let parser: WXMLParser;

beforeEach(() => {
  parser = new WXMLParser();
});

it('should parse WXML', async () => {
  expect(parser.support(ContentType.WXML)).toBeTruthy();
  expect(parser.support(ContentType.CONFIG)).toBeFalsy();
  expect(parser.support(ContentType.WXSS)).toBeFalsy();
  expect(parser.support(ContentType.WXS)).toBeFalsy();
  expect(parser.support(ContentType.JS)).toBeFalsy();

  let ast = await parser.parse(`<view></view>`);
  expect(ast).toMatchSnapshot();
});
