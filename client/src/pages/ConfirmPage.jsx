import React, { useEffect } from 'react';
import styles from '../components/LoginForm/ConfirmPage.module.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const ConfirmPage = ({ uid }) => {
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        if (id !== uid) history.push("/")
    }, [uid, id, history])
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p className={styles.p}>Confirmation link is sent to your email.</p>
                <Link className={styles.link} to="/">Click here to go back to home page.</Link>
            </div>
        </section>
    );
}

ConfirmPage.propTypes = {
    uid: PropTypes.string,
}

const mapStateToProps = state => ({
    uid: state.auth.id
})

export default connect(
    mapStateToProps, null
)(ConfirmPage);
