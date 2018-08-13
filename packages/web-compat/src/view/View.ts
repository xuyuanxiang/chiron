import { h, FunctionalComponent, RenderableProps } from 'preact';
import { ViewProps } from './view-props';

export const View: FunctionalComponent<ViewProps> = ({
  tagName,
  children,
  ...props
}: RenderableProps<ViewProps>) =>
  children ? h(tagName, props, children) : null;

View.defaultProps = {
  tagName: 'div',
};

export default View;
