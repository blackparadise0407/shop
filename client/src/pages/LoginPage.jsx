import React from 'react';
import { Login } from '../components'
import styles from '../components/LoginForm/Login.module.css';

const LoginPage = () => {
    return (
        <section className={styles.section}>
            <Login />
        </section>
    );
}

export default LoginPage;
