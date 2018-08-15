export function createElement(
  tag: keyof HTMLElementTagNameMap,
  attrs?: { [key: string]: string },
): HTMLElement {
  const ele = document.createElement(tag);
  Object.assign(ele.attributes, attrs);

  return ele;
}

export function updateAttribute(
  el: HTMLElement,
  attrs: { [key: string]: string },
): void {
  Object.assign(el.attributes, attrs);
}
