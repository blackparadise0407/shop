import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({
    isAuthenticated,
    component: Component,
    ...rest

}) => {
    console.log(isAuthenticated);
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated === true) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    );
}



export default connect(
    state => ({ isAuthenticated: state.auth.isAuthenticated }),
    null
)(ProtectedRoute);
