import Vue from 'vue';

let instance: Vue;

export function mount(container: HTMLElement, App: any): void {
  const root = document.createElement('div');
  container.appendChild(root);
  instance = new Vue({
    render: h => h(App),
  }).$mount(root);
}

export function unmount(container: HTMLElement): void {
  instance.$destroy();
  instance.$el.innerHTML = '';
  container.innerHTML = '';
}
