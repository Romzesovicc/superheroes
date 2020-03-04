import React from 'react';
import styles from './index.module.css';


const Loader = () => (
  <div className={styles.spinner}>
    <div className='col-12 text-center'>
      <div className={styles.ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);


export default Loader;
