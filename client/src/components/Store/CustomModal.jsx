import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './Modal.module.css';

const CustomModal = ({ isOpen, toggle, header, product: { name, images, price, stock } }) => {
    return (
        <Modal centered className={styles.modal} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} className={styles.header}>{header}</ModalHeader>
            <ModalBody className={styles.body}>
                <div className="left">
                    {name}
                    {price}
                    {stock}
                </div>
                <div className="right">
                    <Link to="/checkout"><Button className={styles.button}>View bag</Button></Link>
                    <br />
                    <Button onClick={toggle} className={styles.button}>Continue shopping</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default CustomModal;