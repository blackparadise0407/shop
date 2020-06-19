import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../components/Store/Product.module.css';
import { AddProduct } from '../components';

const ProductPage = () => {
    return (
        <Router>
            <section className={styles.section}>
                <Switch>
                    <Route path="/product/add" component={AddProduct} />
                </Switch>
            </section>
        </Router>

    );
}

export default ProductPage;
