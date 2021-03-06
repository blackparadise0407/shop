import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Row, Col,
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';
import { ProductCard, CustomModal } from '../components';
import { getFilterProducts, getFilteredProducts } from '../redux/actions/productAction';
import { addToCart, addAuthCart } from '../redux/actions/cartAction';
import styles from '../components/Store/Store.module.css';
import { Filter } from '../components';

import { PropagateSpinner } from '../utils/Loader';
import { useHistory } from 'react-router-dom';

const StorePage = ({
    isLoading,
    products,
    getFilterProducts,
    cart,
    addToCart,
    addAuthCart,
    isAuthenticated,
    getFilteredProducts
}) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [page, setPage] = useState(1);
    //eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(8);
    const [filter, setFilter] = useState("default");
    const toggle = () => { setIsOpen(!isOpen); }
    const handleOnChange = e => {
        setFilter(e.target.value);
    }

    const range = [];
    if (products) {
        for (let i = 0; i < products.totalPage; i++)
            range.push(i);
    }
    const handleOnClick = () => { history.push('/checkout'); }
    const nextPage = () => {
        if (products) {
            const { page, totalPage } = products;
            if (page < totalPage) {
                setPage(page + 1);
            } else setPage(1);
        }
    }
    const previousPage = () => {
        if (products) {
            const { page, totalPage } = products;
            if (page > 1) {
                setPage(page - 1);
            } else setPage(totalPage);
        }
    }
    const paginate = (e, nextPage) => {
        setPage(nextPage);
    }
    const handleAddToCart = (e, product) => {
        toggle();
        addToCart(product);
        const { name, images, price, stock, _id } = product;
        const newProduct = { name, images, price, stock, _id };
        setCurrentProduct(newProduct);
    }
    const handleAddAuthCart = (e, product) => {
        toggle();
        addAuthCart(product);
        const { name, images, price, stock } = product;
        const newProduct = { name, images, price, stock };
        setCurrentProduct(newProduct);
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        //Attemp to apply filter
        getFilterProducts({ filterBy: filter, page, limit });

    }

    useEffect(() => {
        //getFilterProducts({ filterBy: filter, page, limit });
        getFilteredProducts({ filterBy: filter, page, limit });
    }, [getFilteredProducts, filter, page, limit])
    if (isLoading) return (<PropagateSpinner />)
    return (
        <section className={styles.store}>
            {currentProduct && <CustomModal onClick={handleOnClick} product={currentProduct} header="Successfully added to bag!" isOpen={isOpen} toggle={toggle} />}
            <div className={styles.container}>
                <div className={styles.banner}>
                    <div className={styles.headline}>
                        Our store
                    </div>
                    <div className={styles.headlineDescription}>
                        It's a pleasure to serve you.
                    </div>
                </div>
                <Filter onChange={handleOnChange} onSubmit={e => handleOnSubmit(e)} />
                <div className={styles.productContainer}>
                    <Row className={styles.row}>
                        {products ? products.results.map(product => (

                            <Col key={product.productID} className={styles.col} xs={12} sm={6} md={4} lg={3}>
                                {isAuthenticated ?
                                    <ProductCard key={product.productID} productID={product.productID} stock={product.stock} name={product.name} price={product.price} description={product.description} images={product.images} onClick={e => handleAddAuthCart(e, product)} />
                                    :
                                    <ProductCard key={product.productID} productID={product.productID} stock={product.stock} name={product.name} price={product.price} description={product.description} images={product.images} onClick={e => handleAddToCart(e, product)} />
                                }
                                {/* <ProductCard key={product.productID} productID={product.productID} stock={product.stock} name={product.name} price={product.price} description={product.description} images={product.images} onClick={e => handleAddToCart(e, product)} /> */}
                            </Col>

                        )) : null}
                    </Row>
                </div>
            </div>
            <Pagination className={styles.pagination} aria-label="Store pagination">
                <PaginationItem className={styles.paginationItem}>
                    <PaginationLink onClick={previousPage} className={styles.paginationLink} ><i className="fas fa-chevron-left"></i></PaginationLink>
                </PaginationItem>
                {range ? range.map(v => (
                    <PaginationItem key={v + 1} className={styles.paginationItem}>
                        {products.page === v + 1
                            ? <PaginationLink className={`${styles.paginationLink} ${styles.active}`} onClick={e => paginate(e, v + 1)}>{v + 1}</PaginationLink>
                            : <PaginationLink className={styles.paginationLink} onClick={e => paginate(e, v + 1)}>{v + 1}</PaginationLink>}
                    </PaginationItem>
                )) : null}
                <PaginationItem className={styles.paginationItem}>
                    <PaginationLink onClick={nextPage} className={styles.paginationLink} ><i className="fas fa-chevron-right"></i></PaginationLink>
                </PaginationItem>
            </Pagination>
        </section>
    );
}

StorePage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    products: PropTypes.object,
    getFilterProducts: PropTypes.func,
    cart: PropTypes.array,
    addToCart: PropTypes.func,
    addAuthCart: PropTypes.func,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isLoading: state.products.isLoading,
    products: state.products.payload.products,
    cart: state.cart.payload,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
    mapStateToProps,
    { getFilterProducts, addToCart, addAuthCart, getFilteredProducts }
)(StorePage);
