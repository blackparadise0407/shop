import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import styles from './Checkout.module.css';
import { Link } from 'react-router-dom';

import { add, subtract, removeFromCart } from '../../redux/actions/cartAction';

const Checkout = ({
    cart: { payload, totalPrice, totalItem },
    add,
    subtract,
    removeFromCart
}) => {
    const handleAdd = (e, productID) => { add(productID); }
    const handleSubtract = () => { subtract(); }
    const handleRemoveFromCart = (e, productID) => { removeFromCart(productID); }
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
                                    <span className={styles.control}><Button onClick={handleSubtract} className={styles.button}>-</Button> {` ${item.quantity} `} <Button onClick={e => handleAdd(e, item.productID)} className={styles.button}>+</Button></span>
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
                            <li>Shipping: FREE</li>
                        </ul>

                    </div>
                    <div className={styles.checkoutFooter}>Total: {totalPrice}$</div>
                    <Link to="#" className={styles.checkoutLink}>Check out</Link>
                </div>
            </div>
            {payload.length === 0 && <Link className={styles.footer} to="/store">You don't have anything in your cart yet. Go to shopping</Link>}
        </div>
    );
}

const mapStateToProps = state => ({
    cart: state.cart,
})

export default connect(
    mapStateToProps,
    { add, subtract, removeFromCart }
)(Checkout);
