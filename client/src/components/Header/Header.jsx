import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/"><img src="/images/logo.svg" width="100px"
                        height="100px" alt="logo" /></Link>
                    <ul className={styles.navList} >
                        <i className={`fas fa-times ${styles.faTimes} ${styles.navIconToggle}`} onClick={toggle}></i>
                        <Link to="/" className={styles.navItem}>
                            <div className={styles.navLink}>Home</div>
                        </Link>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>Store</a>
                        </li>
                        <li className={styles.navItem}>
                            <a href="/" className={styles.navLink}>About</a>
                        </li>
                        <li className={styles.navItem}>
                            <a className={styles.navLink}>Contact</a>
                        </li>
                        <Link to="/login" className={styles.navItem}>
                            <div className={styles.navLink}>Login</div>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
