import React from 'react';
import styles from './Detail.module.css';
import { Button } from 'reactstrap';
import ImageCarousel from '../../utils/Carousel';

const DetailCard = ({ name, price, description, stock, catName, images, onClick }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
                <div className={styles.img}>
                    <ImageCarousel images={images} />
                </div>
            </div>

            <div className={styles.card}>
                <h1 className={styles.title}>{name}</h1>
                <h3>Price: {price}$</h3>
                <h4>Quantity: {stock ? stock : "Not available"}</h4>
                <p>Category: {catName}</p>
                <p>Description: {description}</p>
                {stock ? <Button onClick={onClick} className={styles.button}>Add to cart <i className="fas fa-shopping-cart"></i></Button> : <Button disabled onClick={onClick} className={styles.button}>Add to cart <i className="fas fa-shopping-cart"></i></Button>}
            </div>
        </div>
    );
}

export default DetailCard;
