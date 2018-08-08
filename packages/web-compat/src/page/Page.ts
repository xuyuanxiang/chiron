import { createElement, Children, ReactNode, StatelessComponent } from 'react';
import { PageProps } from './page-props';
import { page } from './page.less';

export const Page: StatelessComponent<PageProps> = ({
  children,
}: PageProps & { children?: ReactNode }) =>
  createElement('div', { className: page }, Children.only(children));

Page.displayName = 'page';

export default Page;
