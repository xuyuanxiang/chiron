import { ReactNode, StatelessComponent, Children } from 'react';
import { PageProps } from './page-props';

export const Page: StatelessComponent<PageProps> =
  ({ children, path }: PageProps & { children?: ReactNode }) =>
    Children.only(children);

export default Page;
