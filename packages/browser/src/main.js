import App from './App.html';

const app = new App({
  target: document.body,
  data: { name: 'text' },
});

window.app = app;

export default app;
