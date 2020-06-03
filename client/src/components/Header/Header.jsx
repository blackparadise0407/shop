import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css'

import Logout from '../LoginForm/Logout';

const Header = ({ auth: { isAuthenticated, user } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) }

    const guessLink = (
        <Fragment>
            <Link to="/register" className={styles.navItem}>
                <div className={styles.navLink}>Regsiter</div>
            </Link>
            <Link to="/login" className={styles.navItem}>
                <div className={styles.navLink}>Login</div>
            </Link>
        </Fragment>
    )

    const authLink = (
        <Fragment>
            <Link to="/" className={styles.navItem}>
                <div className={styles.navLink}>{user ? `Welcome, ${user.firstName}` : null}</div>
            </Link>

            <Logout />




        </Fragment>
    )

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
                        {/* <Link to="/login" className={styles.navItem}>
                            <div className={styles.navLink}>Login</div>
                        </Link> */}
                        {isAuthenticated ? authLink : guessLink}
                    </ul>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    auth: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    null,
)(Header);
