import { ParseOptions } from './ParseOptions';

export async function parse({ parser }: ParseOptions = {}): Promise<string> {
  if (!parser) {
    const { SimpleParser } = await import('./SimpleParser');
    parser = new SimpleParser();
  }


  return '';
}
