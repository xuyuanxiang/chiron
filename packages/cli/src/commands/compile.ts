import { parse } from 'chiron-compiler';

export async function compile(): Promise<void> {
  await parse();
}
