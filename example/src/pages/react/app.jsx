import React from 'react';
import styles from './app.less';

export default class extends React.Component {
  componentDidMount() {
    console.warn('react did mount');
  }

  componentWillUnmount() {
    console.warn('react will unmount');
  }

  render() {
    return <h1 className={styles.app}>Hello, React</h1>;
  }
}
