import { FunctionalComponent, RenderableProps, h } from 'preact';
import { PageProps } from './page-props';
import * as styles from './page.less';

export const Page: FunctionalComponent<PageProps> = ({
  children,
}: RenderableProps<PageProps>) =>
  h('div', { className: styles.page }, [children]);

export default Page;
