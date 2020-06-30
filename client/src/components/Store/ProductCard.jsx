import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './Store.module.css';
const ProductCard = ({ name, price, description, stock, img, onClick, productID }) => {
    return (
        <Card className={styles.card}>
            <Link className={styles.link} to={{
                pathname: `/product/${productID}/get`
            }}>
                <div className={styles.imageWrapper}>
                    {img.length !== 0 ? <CardImg className={styles.cardImg} top width="100%" src={img[0]} alt="pic" />
                        : <CardImg className={styles.cardImg} top width="100%" src="/images/dummy.png" alt="pic" />
                    }
                </div>
                <CardBody>
                    {stock ? <CardText className={styles.description}>Available: {stock}</CardText> : <CardText className={styles.description}>Not available</CardText>}
                    <CardTitle className={styles.title}>{name}</CardTitle>
                    <CardText className={styles.price}>${price}</CardText>
                    <CardText className={styles.description}>{description}</CardText>
                </CardBody>
            </Link>
            <CardFooter>{stock ? <Button className={styles.button} onClick={onClick}>Add to cart</Button>
                : <Button style={{ cursor: "not-allowed" }} disabled className={styles.button} onClick={onClick}>Contact</Button>
            }</CardFooter>
        </Card>

    );
}

export default ProductCard;