import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './Store.module.css';
import Carousel from '../../utils/Carousel';
const ProductCard = ({ name, price, description, stock, img, onClick, productID }) => {
    return (
        <Card className={styles.card}>
            <Link className={styles.link} to={{
                pathname: `/product/get/${productID}`
            }}>
                <div className={styles.imageWrapper}>
                    <CardImg className={styles.cardImg} top width="100%" max-height="320px" src={img} alt="pic" />
                </div>
                <CardBody>
                    {stock !== 0 ? <CardText className={styles.description}>Available: {stock}</CardText> : <CardText className={styles.description}>Not available</CardText>}
                    <CardTitle className={styles.title}>{name}</CardTitle>
                    <CardText className={styles.price}>${price}</CardText>
                    <CardText className={styles.description}>{description}</CardText>
                </CardBody>
            </Link>
            <CardFooter><Button onClick={onClick}>Add to cart</Button></CardFooter>
        </Card>

    );
}

export default ProductCard;