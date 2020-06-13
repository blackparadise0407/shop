import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Row, Col, Input, Button, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import styles from './Login.module.css'

import { registerUser } from '../../redux/actions/authAction';
import { clearErr } from '../../redux/actions/errorAction';
const Register = ({
    isAuthenticated,
    isLoading,
    registerUser,
    error,
}) => {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);

    const handleFirstNameChange = (e) => {
        setErrMsg(null);
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setErrMsg(null);
        setLastName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setErrMsg(null);
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setErrMsg(null);
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setErrMsg(null);
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = { firstName, lastName, email, password, repPassword: confirmPassword };
        //attemp to register user
        registerUser(user);

    }
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
        if (error.msg) {
            setErrMsg(error.msg);
        } else {
            setErrMsg(null);
        }
    }, [error, isAuthenticated, history]);

    //if (isLoading) return (<div>Is loading...</div>) :: it caused bug somehow @@
    return (
        <div className={styles.containerRegister}>
            <div className={styles.containerHead}>Register</div>
            {errMsg ? <Alert className={styles.alert}>{errMsg}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Row form className={styles.row}>
                    <Col xs="12" sm="6">
                        <FormGroup>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                className={styles.input}
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                placeholder="Sam"
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                        <FormGroup>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                className={styles.input}
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={handleLastNameChange}
                                placeholder="Smith"
                            ></Input>
                        </FormGroup>
                    </Col>
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
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input
                                className={styles.input}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="******"
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" className="mx-auto"><Button className={styles.button}>Register</Button></Col>
                    <Col xs="12"><div className="registerDes">Already have an account? <Link to="/login" className={styles.link}>Login here</Link></div></Col>
                </Row>
            </Form>
        </div>
    );
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    clearErr: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.product.isLoading,
    authMsg: state.auth.msg,
    error: state.error
})

export default connect(
    mapStateToProps,
    { registerUser, clearErr }
)(Register);
