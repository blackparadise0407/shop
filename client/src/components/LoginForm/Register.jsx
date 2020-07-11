import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Row, Col, Input, Button, Alert, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import styles from './Login.module.css'

import { registerUser, clearRegMsg } from '../../redux/actions/authAction';
import { clearErr } from '../../redux/actions/errorAction';
import { ClipSpinner } from '../../utils/Loader'

const Register = ({
    isAuthenticated,
    isLoading,
    registerUser,
    error,
    authMsg,
    clearRegMsg,
    id,
}) => {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
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

    const handleCheckBoxChange = () => {
        setCheckbox(!checkbox);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = { firstName, lastName, email, password, repPassword: confirmPassword };
        //attemp to register user
        registerUser(user);

    }
    useEffect(() => {
        if (authMsg) {
            if (authMsg === "Register success") {
                history.push(`/confirm/${id}`);
                clearRegMsg();
            }
        }
        if (error.msg) {
            setErrMsg(error.msg);
        } else {
            setErrMsg(null);
        }
    }, [error, isAuthenticated, history, authMsg, clearRegMsg, id]);

    //if (isLoading) return (<div>Is loading...</div>) :: it caused bug somehow @@
    return (
        <div className={styles.containerRegister}>
            <div className={styles.containerHead}>Register</div>
            {errMsg ? <Alert className={styles.alert}>{errMsg}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col xs={12} md={6}>
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
                    <Col xs={12} md={6}>
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
                </Row>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className={styles.inputAddon}><img src="/images/mail.svg" width="25px" height="25px" alt="email" /></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    className={styles.input}
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="example@abc.xyz"
                                ></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className={styles.inputAddon}><img src="/images/password.svg" width="25px" height="25px" alt="password" /></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    className={styles.input}
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="******"
                                ></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className={styles.inputAddon}><img src="/images/password_rep.svg" width="25px" height="25px" alt="password_rep" /></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    className={styles.input}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="******"
                                ></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Col xs={12}>
                    <FormGroup check>
                        <Label check className={styles.checkContainer}>
                            <Input className={styles.check} onChange={handleCheckBoxChange} type="checkbox" /><span className={styles.checkMark}></span>
                            I agree to the Jorlux terms and conditions
                        </Label>
                    </FormGroup>
                </Col>
                <Col className={styles.center} xs={12}>
                    {checkbox ? <Button disabled={isLoading} className={styles.button}>{isLoading ? <><span>Register</span><ClipSpinner /> </> : "Register"}</Button> : <Button disabled className={styles.button}>Register</Button>}
                </Col>
                <div className={styles.registerDes}>Already have an account? <Link to="/login" className={styles.link}>Login here</Link></div>
            </Form>
        </div>
    );
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    clearErr: PropTypes.func.isRequired,
    clearRegMsg: PropTypes.func,
    id: PropTypes.string
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    authMsg: state.auth.msg,
    error: state.error,
    id: state.auth.id
})

export default connect(
    mapStateToProps,
    { registerUser, clearErr, clearRegMsg }
)(Register);
