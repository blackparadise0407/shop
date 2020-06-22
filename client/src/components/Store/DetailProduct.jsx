import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { getProductById } from '../../redux/actions/productAction';
import { addToCart } from '../../redux/actions/cartAction';
import DetailCard from './DetailCard';


const DetailProduct = ({
    isLoading,
    product,
    getProductById,
    addToCart,
    cart
}) => {
    const { productID } = useParams();
    const handleAddToCart = () => {
        const newCart = [...cart];
        newCart.push(product);
        const newProduct = product;
        addToCart(newProduct);
    }
    useEffect(() => {
        //Attemp to load product by ID from URL param
        getProductById({ productID })
    }, [getProductById, productID])
    // if (product === null) return <Redirect to={{
    //     pathname: "/notfound",
    //     from: location
    // }} />
    if (isLoading) return (<div>Loading ...</div>)
    return (
        <div className={styles.container}>
            {product ? <DetailCard name={product.name} price={product.price} stock={product.stock} description={product.description} catName={product.category.name} images={product.images} onClick={handleAddToCart} /> : null}
        </div>
    );
}

DetailProduct.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    getProductById: PropTypes.func.isRequired,
    addToCart: PropTypes.func,
    cart: PropTypes.array,
}

const mapStateToProps = state => ({
    isLoading: state.products.isLoading,
    product: state.products.payload.product,
    cart: state.cart.payload,
})

export default connect(
    mapStateToProps,
    { getProductById, addToCart }
)(DetailProduct);