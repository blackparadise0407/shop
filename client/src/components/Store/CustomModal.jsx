import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './Modal.module.css';

const CustomModal = ({
    cart,
    isOpen,
    toggle,
    header,
    product: { name, images, price, stock } }) => {
    return (
        <Modal centered className={styles.modal} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} ><div className={styles.header}>{header}</div></ModalHeader>
            <ModalBody className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.image}>
                        <img className={styles.img} src={images[0]} alt={name} />

                    </div>
                    <div className={styles.content}>
                        <div className={styles.leftInfo}><span>Name:{" "}</span><span>{name}</span></div>
                        <div className={styles.leftInfo}><span>Price:{" "}</span><span>${price}</span></div>

                    </div>
                </div>
                <div className={styles.right}>
                    {cart ?
                        <div className={styles.rightBody}>
                            <div className={styles.rightBodyHeader}>Order summary</div>
                            <div className={styles.rightBodyContent}>
                                <div className={styles.rightInfo}><span>Subtotal:</span><span>{cart.totalPrice}</span></div>
                                <div className={styles.rightInfo}><span>Total item:</span><span>{cart.totalItem}</span></div>
                                <div className={styles.rightInfo}><span>Total:</span><span>{cart.totalPrice}</span></div>
                            </div>
                        </div> : null}
                    <div className={styles.rightFooter}>
                        <Link to={{
                            pathname: "/checkout",
                        }}><Button className={styles.button}>View bag</Button></Link>
                        <br />
                        <Button onClick={toggle} className={styles.button}>Continue shopping</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

CustomModal.propTypes = {
    cart: PropTypes.object
}

export default connect(
    state => ({ cart: state.cart }),
    null
)(CustomModal);