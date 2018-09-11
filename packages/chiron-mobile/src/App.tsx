import { h } from 'preact';

export function App() {
  Promise.resolve().then(() => {
    alert('resolved');
  });
  return <div>index</div>;
}
