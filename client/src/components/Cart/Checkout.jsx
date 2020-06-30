import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './Checkout.module.css';
import { Link } from 'react-router-dom';

import { quantityControl, removeFromCart } from '../../redux/actions/cartAction';

const Checkout = ({
    cart: { payload, totalPrice, totalItem },
    quantityControl,
    removeFromCart,
}) => {
    const handleAdd = (e, product) => { quantityControl(product, 'inc'); }
    const handleSubtract = (e, product) => { quantityControl(product, 'dec'); }
    const handleRemoveFromCart = (e, product) => { removeFromCart(product); }
    return (
        <div className={styles.container}>
            <div className={styles.headline}>Checkout</div>
            <div className={styles.mainContainer}>
                <ul className={styles.cartContainer}>
                    {payload ? payload.map(item => (
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
                    )) : null}

                </ul>
                <div className={styles.checkout}>
                    <div className={styles.checkoutHeader}>Order summary</div>
                    <div className={styles.checkoutBody}>
                        <ul style={{ listStyle: "none" }}>
                            <li>Subtotal: {totalPrice}$</li>
                            <li>Total item: {totalItem}</li>
                            <li>Shipping: FREE</li>
                        </ul>

                    </div>
                    <div className={styles.checkoutFooter}>Total: {totalPrice}$</div>
                    <Link to="#" className={styles.checkoutLink}>Check out</Link>
                </div>
            </div>
            {payload.length === 0 && <Link className={styles.footer} to="/store">You don't have anything in your cart yet. Go to shopping</Link>}
            <ToastContainer style={{ fontFamily: "var(--main-font)", fontSize: "1.4rem" }} autoClose={3000} />
        </div>
    );
}

const mapStateToProps = state => ({
    cart: state.cart,
})

export default connect(
    mapStateToProps,
    { quantityControl, removeFromCart }
)(Checkout);
