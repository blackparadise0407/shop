import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function (ComposedComponent) {
    const Authentication = () => {

    }
}

ProtectedRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    isAuth: state.auth.isAuthenticated;
}

export default connect(
    mapStateToProps,
    null
)(ProtectedRoute);
