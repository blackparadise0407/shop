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
    const totalPage = products.totalPage;


    const nextPage = () => {
        if (page > totalPage) setPage(0);
        setPage(page + 1);
    }
    const previousPage = () => {
        setPage(page - 1);
    }

    useEffect(() => {
        getProducts(page, limit);
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
            <Pagination aria-label="Store pagination">
                <PaginationItem>
                    <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous href="#" onClick={previousPage} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink next href="#" onClick={nextPage} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last href="#" />
                </PaginationItem>
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
