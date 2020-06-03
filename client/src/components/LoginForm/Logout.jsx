import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link } from "react-router-dom";
import { logout } from '../../redux/actions/authAction';
import { NavLink } from 'reactstrap';
import styles from '../Header/Header.module.css';

const Logout = ({ logout, className1, className2 }) => {
    const history = useHistory();
    const handleLogout = () => {
        logout();
        history.push("/");
    }
    return (
        <NavLink className={styles.navItem} href="#" onClick={handleLogout}>
            <div className={styles.navLink}>Logout</div>
        </NavLink>
    );
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(
    null, { logout }
)(Logout);
