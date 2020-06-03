import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Row, Col, Input, Button, Alert } from 'reactstrap';
import { Link, Redirect, useLocation } from 'react-router-dom'
import styles from './Login.module.css'

import { loginUser } from '../../redux/actions/authAction';
import { clearErr } from '../../redux/actions/errorAction';

const Login = ({
    isAuthenticated,
    isLoading,
    loginUser,
    clearErr,
    error
}) => {
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);

    const handleEmailChange = (e) => {
        setErrMsg(null);
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setErrMsg(null);
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = { email, password };
        //Attemp to login
        loginUser(user);
    }
    useEffect(() => {
        if (error.msg) {
            setErrMsg(error.msg);
        } else {
            setErrMsg(null);
        }
    }, [isAuthenticated, error])
    return (
        <div className={styles.container}>
            <div className={styles.containerHead}>Login</div>
            {errMsg ? <Alert className={styles.alert}>{errMsg}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Row form className={styles.row}>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                className={styles.input}
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="example@abc.xyz"
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                className={styles.input}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="******"
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" className="mx-auto"><Button className={styles.button}>Login</Button></Col>
                    <Col xs="12"><div className="loginDes">Doesn't have an account?<Link to="/register" className={styles.link}>Register here</Link></div></Col>
                </Row>
            </Form>
        </div>
    );
}

Login.propsType = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.error
})

export default connect(
    mapStateToProps,
    { loginUser, clearErr }
)(Login);