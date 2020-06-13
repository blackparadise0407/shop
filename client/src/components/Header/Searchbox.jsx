import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Searchbox = ({ _id, name }) => {
    return (

        <li className={styles.li}>
            <Link className={styles.link} to={{ pathname: `/products/:${_id}` }}>{name}</Link>
        </li>

    );
}

export default Searchbox;
