import React from 'react';
import { ForgotPassword } from '../components'
import styles from '../components/LoginForm/Login.module.css';

const ResetPage = () => {
    return (
        <section className={styles.section}>
            <ForgotPassword />
        </section>
    );
}

export default ResetPage;
