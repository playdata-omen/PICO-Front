import React, { useEffect } from 'react';

import Nav from './Nav/Nav';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Nav />
      </div>
    </header>
  )
}

export default Header
