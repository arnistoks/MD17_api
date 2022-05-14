import React from 'react';
import styles from './loader.module.scss';
import Logo from '../../data/logo.png';

const Loader = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.loader}>
        <img src={Logo} alt="Logo" width="500" />
      </div>
    </div>
  </section>
);

export default Loader;
