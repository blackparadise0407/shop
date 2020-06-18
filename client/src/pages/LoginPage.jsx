import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, ForgotPassword } from '../components'
import styles from '../components/LoginForm/Login.module.css';

const LoginPage = () => {
    return (
        <section className={styles.section}>
            <Login />
        </section>
    );
}

export default LoginPage;
