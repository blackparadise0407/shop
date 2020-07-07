import React from 'react';
import styles from './Dashboard.module.css';

const Profile = ({ firstName }) => {
    return (
        <>
            <img src="avatar" alt={firstName} />
            <div className={styles.nameContainer}>
                Welcome, {firstName}
            </div>
        </>
    );
}

export default Profile;
