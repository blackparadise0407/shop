import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import styles from './Modal.module.css';

const CustomModal = ({ isOpen, toggle, header, product: { name, images, price, stock } }) => {
    const history = useHistory();
    const navigate = () => { history.push("/checkout"); }
    return (
        <Modal centered className={styles.modal} isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} className={styles.header}>{header}</ModalHeader>
            <ModalBody className={styles.body}>
                <div className={styles.left}>
                    <div className={styles.image}>
                        <img className={styles.img} src={images[0]} alt={name} />

                    </div>
                    <div className={styles.content}>
                        <h3>{name}</h3>
                        <h4>{price}</h4>
                    </div>
                </div>
                <div className={styles.right}>
                    <Link to={{
                        pathname: "/checkout",
                    }}><Button className={styles.button}>View bag</Button></Link>
                    <br />
                    <Button onClick={toggle} className={styles.button}>Continue shopping</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default CustomModal;