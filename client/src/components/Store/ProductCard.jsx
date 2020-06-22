import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import styles from './Store.module.css';
const ProductCard = ({ name, price, description, stock, img, onClick }) => {
    return (
        <Card className={styles.card}>
            <CardImg className={styles.cardImg} top width="100%" src={img} alt="pic" />
            <CardBody>
                {stock !== 0 ? <CardText className={styles.description}>Available: {stock}</CardText> : <CardText className={styles.description}>Not available</CardText>}
                <CardTitle className={styles.title}>{name}</CardTitle>
                <CardText className={styles.price}>${price}</CardText>
                <CardText className={styles.description}>{description}</CardText>
            </CardBody>
            <CardFooter><Button onClick={onClick}>Add to cart</Button></CardFooter>
        </Card>

    );
}

export default ProductCard;