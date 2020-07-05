import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './Checkout.module.css';
import { Link } from 'react-router-dom';

import {
    quantityControl,
    removeFromCart,
    removeAuthCart
} from '../../redux/actions/cartAction';

const Checkout = ({
    cart: { payload, totalPrice, totalItem },
    quantityControl,
    removeFromCart,
    isLoading,
    removeAuthCart,
    isAuthenticated,
}) => {
    const [shipping, setShipping] = useState(null);
    const handleAdd = (e, product) => { quantityControl(product, 'inc'); }
    const handleSubtract = (e, product) => { quantityControl(product, 'dec'); }
    const handleRemoveFromCart = (e, product) => { removeFromCart(product); }
    const handleRemoveFromAuthCart = (e, product) => { removeAuthCart(product); }
    useEffect(() => {
        if (payload.length !== 0) {
            if (totalPrice > 1000) setShipping(null);
            else setShipping(Number(totalPrice * 0.02).toFixed(2));
        }
    }, [totalItem, totalPrice, payload.length])
    return (
        <div className={styles.container}>
            <div className={styles.headline}>Checkout</div>
            <div className={styles.mainContainer}>
                <ul className={styles.cartContainer}>
                    {payload ? payload.map(item => (
                        <Fragment key={item._id}>
                            {isAuthenticated ?
                                <li key={item.id} className={styles.item}>
                                    <i onClick={e => handleRemoveFromAuthCart(e, item)} className={`fas fa-times ${styles.times}`}></i>
                                    <div className={styles.infoContainer}>
                                        <img className={styles.img} src={item.product.images[0]} alt={item.product.name} />
                                        <div className={styles.info}>
                                            <div className={styles.name}>{item.product.name}</div>
                                            <span className={styles.control}><Button onClick={e => handleSubtract(e, item)} className={styles.button}>-</Button> {` ${item.quantity} `} <Button onClick={e => handleAdd(e, item)} className={styles.button}>+</Button></span>
                                        </div>

                                    </div>
                                </li>
                                :
                                <li key={item.productID} className={styles.item}>
                                    <i onClick={e => handleRemoveFromCart(e, item)} className={`fas fa-times ${styles.times}`}></i>
                                    <div className={styles.infoContainer}>
                                        <img className={styles.img} src={item.image} alt={item.name} />
                                        <div className={styles.info}>
                                            <div className={styles.name}>{item.name}</div>
                                            <span className={styles.control}><Button onClick={e => handleSubtract(e, item)} className={styles.button}>-</Button> {` ${item.quantity} `} <Button onClick={e => handleAdd(e, item)} className={styles.button}>+</Button></span>
                                        </div>

                                    </div>
                                </li>
                            }
                        </Fragment>
                    )) : null}

                </ul>
                <div className={styles.checkout}>
                    <div className={styles.checkoutHeader}>Order summary</div>
                    <div className={styles.checkoutBody}>
                        <ul style={{ listStyle: "none" }}>
                            <li>Subtotal: ${totalPrice}</li>
                            <li>Total item: {totalItem}</li>
                            {payload.length === 0 ? null
                                : <li>
                                    Shipping: {shipping ? `$${shipping}` : "FREE"}
                                </li>}
                            {/* <li>Shipping: {totalPrice * 0.02 === 0 ? "FREE" : `$${totalPrice * 0.02}`}</li> */}
                        </ul>

                    </div>
                    <div className={styles.checkoutFooter}>Total: {Number(Number(totalPrice) + Number(shipping)).toFixed(2)}$</div>
                    <Link to="#" className={styles.checkoutLink}>Check out</Link>
                </div>
            </div>
            {payload.length === 0 && <Link className={styles.footer} to="/store">You don't have anything in your cart yet. Go to shopping</Link>}
            <ToastContainer style={{ fontFamily: "var(--main-font)", fontSize: "1.4rem" }} autoClose={3000} />
        </div >
    );
}

const mapStateToProps = state => ({
    cart: state.cart,
    isLoading: state.cart.isLoading,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { quantityControl, removeFromCart, removeAuthCart }
)(Checkout);
