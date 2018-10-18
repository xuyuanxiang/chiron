import React from 'react';
import ReactDOM from 'react-dom';

export function mount(container: HTMLElement, App: any) {
  ReactDOM.render(React.createElement(App), container);
}

export function unmount(container: HTMLElement) {
  ReactDOM.unmountComponentAtNode(container);
}
