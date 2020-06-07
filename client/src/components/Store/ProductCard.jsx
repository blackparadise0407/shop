import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import styles from './Store.module.css';
const ProductCard = ({ name, price, description, stock }) => {
    return (
        <Card className={styles.card}>
            <CardImg className={styles.cardImg} top width="100%" src="/images/ip.jpg" alt="pic" />
            <CardBody>
                <CardText className={styles.description}>Available: {stock}</CardText>
                <CardTitle className={styles.title}>{name}</CardTitle>
                <CardText className={styles.price}>${price}</CardText>
                <CardText className={styles.description}>{description}</CardText>
            </CardBody>
        </Card>

    );
}

export default ProductCard;