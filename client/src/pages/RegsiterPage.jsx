import React from 'react';
import { Register, Header } from '../components'
import styles from '../components/LoginForm/Login.module.css';

const LoginPage = () => {
    return (
        <section className={styles.section}>
            <Header />
            <Register />
        </section>
    );
}

export default LoginPage;
