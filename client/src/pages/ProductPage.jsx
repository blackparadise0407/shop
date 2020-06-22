import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../components/Store/Product.module.css';
import { AddProduct, EditProduct, DetailProduct } from '../components';

const ProductPage = () => {
    return (
        <Router>
            <section className={styles.section}>
                <Switch>
                    <Route path="/product/get/:productID" exact render={() => <DetailProduct />} />
                    <Route path="/product/add" exact render={() => <AddProduct />} />
                    <Route path="/product/update/:productID" exact render={() => <EditProduct />} />
                </Switch>
            </section>
        </Router>

    );
}

export default ProductPage;
