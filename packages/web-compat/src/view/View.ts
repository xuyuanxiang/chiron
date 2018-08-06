import { createElement, ReactNode, StatelessComponent } from 'react';
import { ViewProps } from './view-props';

export const View: StatelessComponent<ViewProps> = ({
  children,
  tagName = 'div',
  ...props
}: ViewProps & { children?: ReactNode }) =>
  createElement(tagName, props, children);

View.defaultProps = {
  tagName: 'div',
};

export default View;
