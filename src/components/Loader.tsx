import React from 'react';
import Logo from '../data/logo.png';

const Loader = () => (
  <section className="section">
    <div className="container">
      <div className="loader">
        <img src={Logo} alt="Logo" width="500" />
      </div>
    </div>
  </section>

);

export default Loader;
