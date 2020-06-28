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
import { getFilterProducts } from '../redux/actions/productAction';
import { addToCart } from '../redux/actions/cartAction';
import styles from '../components/Store/Store.module.css';
import { Filter } from '../components';

import { PropagateSpinner } from '../utils/Loader';

const StorePage = ({
    isLoading,
    products,
    getFilterProducts,
    cart,
    addToCart
}) => {
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

    const paginate = (e, nextPage) => {
        e.preventDefault();
        setPage(nextPage);
    }
    const handleAddToCart = (e, product) => {
        toggle();
        addToCart(product);
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
        getFilterProducts({ filterBy: filter, page, limit });
    }, [getFilterProducts, filter, page, limit])
    if (isLoading) return (<PropagateSpinner />)
    return (
        <section className={styles.store}>
            {currentProduct && <CustomModal product={currentProduct} header="Successfully added to bag!" isOpen={isOpen} toggle={toggle} />}
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

                                <ProductCard key={product.productID} productID={product.productID} stock={product.stock} name={product.name} price={product.price} description={product.description} img={product.images} onClick={e => handleAddToCart(e, product)} />
                            </Col>

                        )) : null}
                    </Row>
                </div>
            </div>
            <Pagination className={styles.pagination} aria-label="Store pagination">
                <PaginationItem className={styles.paginationItem}>
                    <PaginationLink className={styles.paginationLink} ><i className="fas fa-chevron-left"></i></PaginationLink>
                </PaginationItem>
                {range ? range.map(v => (
                    <PaginationItem key={v + 1} className={styles.paginationItem}>
                        {products.page === v + 1
                            ? <PaginationLink className={`${styles.paginationLink} ${styles.active}`} onClick={e => paginate(e, v + 1)}>{v + 1}</PaginationLink>
                            : <PaginationLink className={styles.paginationLink} onClick={e => paginate(e, v + 1)}>{v + 1}</PaginationLink>}
                    </PaginationItem>
                )) : null}
                <PaginationItem className={styles.paginationItem}>
                    <PaginationLink className={styles.paginationLink} ><i className="fas fa-chevron-right"></i></PaginationLink>
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
    addToCart: PropTypes.func
}

const mapStateToProps = state => ({
    isLoading: state.products.isLoading,
    products: state.products.payload.products,
    cart: state.cart.payload,
})

export default connect(
    mapStateToProps,
    { getFilterProducts, addToCart }
)(StorePage);
