import angular from 'angular';

let instance: angular.auto.IInjectorService;

export function mount(container: HTMLElement, App: any): void {
  const root = document.createElement('div');
  root.innerHTML = '<ws-app/>';
  container.appendChild(root);
  global.angular = angular;
  instance = angular.bootstrap(root, [App]);
}

export function unmount(container: HTMLElement): void {
  instance.get('$rootScope').$destroy();
  container.innerHTML = '';
  if (angular === global.angular) {
    delete global.angular;
  }
}
