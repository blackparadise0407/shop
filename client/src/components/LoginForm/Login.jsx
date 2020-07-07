import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Row, Col, Input, Button, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from 'react-toastify';

import styles from './Login.module.css'

import { loginUser } from '../../redux/actions/authAction';
import { ClipSpinner } from '../../utils/Loader';

const Login = ({
    isAuthenticated,
    isLoading,
    loginUser,
    error
}) => {
    const reCapEl = useRef(null);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [verify, setVerify] = useState(false);
    const handleEmailChange = (e) => {
        setErrMsg(null);
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setErrMsg(null);
        setPassword(e.target.value);
    }
    const captchaOnChange = () => {
        setVerify(true);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const user = { email, password };
        //Attemp to login
        if (!verify) {
            toast.error('Please verify you are a human', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            loginUser(user);
            setVerify(false);
            reCapEl.current.reset();
        }


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
    }, [isAuthenticated, error, history])
    return (
        <div className={styles.container}>
            <div className={styles.containerHead}>Login</div>
            {errMsg ? <Alert className={styles.alert}>{errMsg}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Row form className={styles.row}>
                    <Col xs="12">
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
                </Row><Row>
                    <Col xs="12">
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className={styles.inputAddon}><img src="/images/password.svg" width="25px" height="25px" alt="email" /></InputGroupText>
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
                    </Col></Row>
                <Row form>
                    <Col xs={12} lg={6}>
                        <ReCAPTCHA
                            ref={reCapEl}
                            sitekey="6LdBEqoZAAAAAKwCucNAr52p_oz_RiHOZbWC6GnG"
                            onChange={captchaOnChange}
                        />
                    </Col>
                    <Col xs={12} lg={6}><Button disabled={isLoading} className={styles.button}>{isLoading ? <><span>Login</span><ClipSpinner /> </> : "Login"}</Button></Col>
                </Row>
                {/* {error.msg === "Invalid credentials" ? <Col xs="12" className="mx-auto"><Link to={{
                        pathname: `${location.pathname}/reset`,
                        state: { from: location }
                    }}>Forgot password?</Link></Col> : null} */}
                <Col xs="12" className="mx-auto"><Link className={styles.link} to="/reset">Forgot password?</Link></Col>
                <Col xs="12"><div className="loginDes">Doesn't have an account? <Link to="/register" className={styles.link}>Register here</Link></div></Col>

            </Form>
            <ToastContainer
                style={{ fontFamily: "var(--secondary-font)", fontSize: "1.4rem" }}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </div>
    );
}

Login.propsType = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    loginUser: PropTypes.func.isRequired,
    error: PropTypes.object,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.error
})

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
