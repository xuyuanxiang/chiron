import { h, RenderableProps, FunctionalComponent } from 'preact';
import { PageProps } from './page-props';
import { page } from './page.less';

export const Page: FunctionalComponent<PageProps> = ({
  children,
}: RenderableProps<PageProps>) =>
  children ? h('div', { className: page }, children) : null;

Page.displayName = 'page';

export default Page;
