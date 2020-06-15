import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from '../components/Store/Detail.module.css';
import { getProductById } from '../redux/actions/productAction';

const DetailProductPage = ({
    isLoading,
    product,
    getProductById
}) => {
    const { productID } = useParams();
    useEffect(() => {
        //Attemp to load product by ID from URL param
        getProductById({ productID })
    }, [getProductById, productID])
    return (
        <section className={styles.detailSection}>
            <div className={styles.container}>
                hihi
            </div>
        </section>
    );
}

DetailProductPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    getProductById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.products.isLoading,
    product: state.products.product
})

export default connect(
    mapStateToProps,
    { getProductById }
)(DetailProductPage);
