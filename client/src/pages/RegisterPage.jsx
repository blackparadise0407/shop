import React from 'react';
import { Register } from '../components'
import styles from '../components/LoginForm/Login.module.css';

const RegisterPage = () => {
    return (
        <section className={styles.section}>
            <Register />
        </section>
    );
}

export default RegisterPage;
