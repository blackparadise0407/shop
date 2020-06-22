import React from 'react';
import { Checkout } from '../components';
import styles from '../components/Cart/Checkout.module.css';

const CheckoutPage = () => {
    return (
        <section className={styles.section}>
            <Checkout />
        </section>
    );
}

export default CheckoutPage;
