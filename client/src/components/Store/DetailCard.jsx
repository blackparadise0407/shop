import React from "react";
import styles from "./Detail.module.css";
import { Button } from "reactstrap";
import ImageCarousel from "../../utils/Carousel";

const DetailCard = ({
  name,
  price,
  description,
  stock,
  catName,
  images,
  onClick,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <div className={styles.img}>
          <ImageCarousel images={images} />
        </div>
      </div>

      <div className={styles.card}>
        <p style={{ fontStyle: "italic", textTransform: "capitalize" }}>
          {catName}
        </p>
        <h1 className={styles.title}>{name}</h1>
        <h3>
          <strong>{price}$</strong>
        </h3>
        <h4>Quantity: {stock ? stock : "Not available"}</h4>
        <p>Description: {description}</p>
        {stock ? (
          <Button onClick={onClick} className={styles.button}>
            Add to cart <i className="fas fa-shopping-cart"></i>
          </Button>
        ) : (
          <Button
            style={{ cursor: "not-allowed" }}
            disabled
            onClick={onClick}
            className={styles.button}
          >
            Contact <i className="fas fa-shopping-cart"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
