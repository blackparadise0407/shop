import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ProductCard } from '../components';
import { getProducts } from '../redux/actions/productAction';
import styles from '../components/Store/Store.module.css';

const StorePage = ({
    isLoading,
    getProducts,
    products
}) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    const range = [];
    if (products) {
        for (let i = 0; i < products.totalPage; i++)
            range.push(i);
    }

    const paginate = (e, nextPage) => {
        e.preventDefault();
        setPage(nextPage);
    }

    useEffect(() => {
        getProducts({ page, limit });
    }, [page, limit])
    if (isLoading) return (<div>Loading...</div>)
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
                <div className={styles.productContainer}>
                    <Row className={styles.row}>
                        {products ? products.results.map(product => (
                            <Col className={styles.col} xs="6" md="4" lg="3">
                                <ProductCard key={product.productID} stock={product.stock} name={product.name} price={product.price} description={product.description} />
                            </Col>
                        )) : null}
                    </Row>
                </div>
            </div>
            <Pagination className={styles.pagination} aria-label="Store pagination">
                {range ? range.map(v => (
                    <PaginationItem className={styles.paginationItem}>
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
    products: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isLoading: state.product.isLoading,
    products: state.product.payload,
})

export default connect(
    mapStateToProps,
    { getProducts }
)(StorePage);
