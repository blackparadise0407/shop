import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import styles from './Checkout.module.css';
import { Link } from 'react-router-dom';

const Checkout = ({
    cart: { payload, totalPrice, totalItem }
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.headline}>Checkout</div>
            <div className={styles.mainContainer}>
                <ul className={styles.cartContainer}>
                    {payload ? payload.map(item => (
                        <li className={styles.item}>
                            <i className={`fas fa-times ${styles.times}`}></i>
                            <div className={styles.infoContainer}>
                                <img className={styles.img} src={item.image} />
                                <div className={styles.info}>
                                    <div className={styles.name}>{item.name}</div>
                                    <span><Button className={styles.button}>-</Button> 0 <Button className={styles.button}>+</Button></span>
                                </div>

                            </div>
                        </li>
                    )) : null}

                </ul>
                <div className={styles.checkout}>
                    <div className={styles.checkoutHeader}>Order summary</div>
                    <div className={styles.checkoutBody}>
                        <ul style={{ listStyle: "none" }}>
                            <li>Subtotal: {totalPrice}$
                            </li>
                            <li>Shipping: FREE</li>
                        </ul>

                    </div>
                    <div className={styles.checkoutFooter}>Total: {totalPrice}$</div>
                    <Link className={styles.checkoutLink}>Check out</Link>
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
    null
)(Checkout);
