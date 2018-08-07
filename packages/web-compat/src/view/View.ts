import { h, RenderableProps, FunctionalComponent } from 'preact';
import { ViewProps } from './view-props';

export const View: FunctionalComponent<ViewProps> = ({
  children,
  tagName = 'div',
  ...props
}: RenderableProps<ViewProps>) => h(tagName, props, children ? children : null);

View.defaultProps = {
  tagName: 'div',
  hoverClass: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 50,
  hoverStayTime: 400,
  hidden: false,
};

export default View;
