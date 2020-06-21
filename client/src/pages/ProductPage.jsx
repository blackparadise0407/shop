import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../components/Store/Product.module.css';
import { AddProduct, EditProduct } from '../components';

const ProductPage = () => {
    return (
        <Router>
            <section className={styles.section}>
                <Switch>
                    {/* <Route path="/product/:id" /> */}
                    <Route path="/product/add" render={() => <AddProduct />} />
                    <Route exact path="/product/:productID/edit" render={() => <EditProduct />} />
                </Switch>
            </section>
        </Router>

    );
}

export default ProductPage;
