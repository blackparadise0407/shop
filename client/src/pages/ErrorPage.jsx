import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/Error/Error.module.css';
const ErrorPage = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.headline}>
                    404 NOT FOUND
                </div>
                <Link className={styles.link} to="/">Go back to home page</Link>
            </div>
        </section>
    );
}

export default ErrorPage;
