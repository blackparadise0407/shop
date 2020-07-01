import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './Store.module.css';
const ProductCard = ({ name, price, description, stock, images, onClick, productID }) => {
    return (
        <Card className={styles.card}>
            <Link className={styles.link} to={{
                pathname: `/product/${productID}/get`
            }}>
                <div className={styles.imageWrapper}>
                    {images.length !== 0 ? <CardImg className={styles.cardImg} top src={images[0]} alt="pic" />
                        : <CardImg className={styles.cardImg} top src="/images/dummy.png" alt="pic" />
                    }
                </div>
            </Link>
            <CardBody className={styles.cardBody}>
                {stock ? <CardText className={styles.description}>Available: {stock}</CardText> : <CardText className={styles.description}>Not available</CardText>}
                <CardTitle className={styles.title}>{name}</CardTitle>
                <CardText className={styles.price}>${price}</CardText>
                <CardText className={styles.description}>{description}</CardText>
                {stock ? <Button style={{ float: "right" }} className={styles.button} onClick={onClick}>Add to cart</Button>
                    : <Button style={{ cursor: "not-allowed", float: "right" }} disabled className={styles.button} onClick={onClick}>Contact</Button>
                }
            </CardBody>


        </Card>

    );
}

export default ProductCard;