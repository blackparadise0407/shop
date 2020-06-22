import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Searchbox = ({ productID, name }) => {
    return (

        <li className={styles.li}>
            <Link className={styles.link} to={{ pathname: `/product/get/${productID}` }}>{name}</Link>
        </li>

    );
}

export default Searchbox;
