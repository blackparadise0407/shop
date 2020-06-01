import React, { useState } from 'react';
import styles from './Header.module.css'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) }
    return (
        <header className={isOpen ? `${styles.open}` : ""}>
            <div className="container">
                <div className={styles.nav}>
                    <div className={styles.menuToggle}>
                        <i className={`fas fa-bars ${styles.faBars} ${styles.navIconToggle}`} onClick={toggle}></i>
                    </div>
                    <a href="#"><img src="/images/logo.svg" width="100px"
                        height="100px" alt="logo" /></a>
                    <ul className={styles.navList} >
                        <i className={`fas fa-times ${styles.faTimes} ${styles.navIconToggle}`} onClick={toggle}></i>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>Home</a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>Store</a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>About</a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
