import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ProductCard } from '../components';
import { getProducts, getFilterProducts } from '../redux/actions/productAction';
import styles from '../components/Store/Store.module.css';
import { Filter } from '../components';

import { PropagateSpinner } from '../utils/Loader';

const StorePage = ({
    isLoading,
    getProducts,
    products,
    getFilterProducts
}) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [filter, setFilter] = useState("default");
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

    const handleOnSubmit = e => {
        e.preventDefault();
        //Attemp to apply filter
        getFilterProducts({ filterBy: filter, page, limit });

    }

    useEffect(() => {
        getFilterProducts({ filterBy: filter, page, limit });
    }, [filter, page, limit])
    if (isLoading) return (<PropagateSpinner />)
    return (
        <section className={styles.store}>
            <div className={styles.container}>
                <div className={styles.banner}>
                    <div className={styles.headline}>
                        Our store
                    </div>
                    <div className={styles.headlineDescription}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur libero natus voluptatibus, sapiente modi ipsam nesciunt unde in numquam.
                    </div>
                </div>
                <Filter onChange={handleOnChange} onSubmit={e => handleOnSubmit(e)} />
                <div className={styles.productContainer}>
                    <Row className={styles.row}>
                        {products ? products.results.map(product => (
                            <Col key={product.productID} className={styles.col} xs="6" md="4" lg="3">
                                <ProductCard key={product.productID} stock={product.stock} name={product.name} price={product.price} description={product.description} />
                            </Col>
                        )) : null}
                    </Row>
                </div>
            </div>
            <Pagination className={styles.pagination} aria-label="Store pagination">
                {range ? range.map(v => (
                    <PaginationItem key={v + 1} className={styles.paginationItem}>
                        {products.page === v + 1
                            ? <PaginationLink className={`${styles.paginationLink} ${styles.active}`} onClick={e => paginate(e, v + 1)}>{v + 1}</PaginationLink>
                            : <PaginationLink className={styles.paginationLink} onClick={e => paginate(e, v + 1)}>{v + 1}</PaginationLink>}
                    </PaginationItem>
                )) : null}
            </Pagination>
        </section>
    );
}

StorePage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    products: PropTypes.object,
    getProducts: PropTypes.func.isRequired,
    getFilterProducts: PropTypes.func
}

const mapStateToProps = state => ({
    isLoading: state.product.isLoading,
    products: state.product.payload,
})

export default connect(
    mapStateToProps,
    { getProducts, getFilterProducts }
)(StorePage);
