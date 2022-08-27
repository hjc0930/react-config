import React from 'react';
import styles from './home.module.less';

interface HomeProps { }

const Home: React.FC<HomeProps> = (props) => {
  const { } = props
  return (
    <div className={styles.box}>Home</div>
  );
};
export default Home