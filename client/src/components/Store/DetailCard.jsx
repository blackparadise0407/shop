import React from 'react';
import styles from './Detail.module.css';
import { Button } from 'reactstrap';

const DetailCard = ({ name, price, description, stock, catName }) => {
    return (
        <div className={styles.cardContainer}>
            <img className={styles.img} src="/images/ip.jpg" alt="" />
            <div className={styles.card}>
                <h1 className={styles.title}>{name}</h1>
                <h3>Price: {price}$</h3>
                <h4>Quantity: {stock}</h4>
                <p>Category: {catName}</p>
                <p>Description: {description}</p>
                <Button className={styles.button}>Add to cart <i className="fas fa-shopping-cart"></i></Button>
            </div>
        </div>
    );
}

export default DetailCard;
