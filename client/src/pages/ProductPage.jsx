import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../components/Store/Product.module.css';
import { AddProduct, EditProduct, DetailProduct } from '../components';

const ProductPage = () => {
    return (
        <Router>
            <section className={styles.section}>
                <Switch>
                    <Route path={`/product/:productID/get`} render={() => <DetailProduct />} />
                    <Route path="/product/add" render={() => <AddProduct />} />
                    <Route path="/product/:productID/update" render={() => <EditProduct />} />
                </Switch>
            </section>
        </Router>

    );
}

export default ProductPage;
