import React from 'react';
import { Login, Header } from '../components'
import styles from '../components/LoginForm/Login.module.css';

const LoginPage = () => {
    return (
        <section className={styles.section}>
            <Header />
            <Login />
        </section>
    );
}

export default LoginPage;
