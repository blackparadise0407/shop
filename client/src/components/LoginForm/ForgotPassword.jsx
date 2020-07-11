import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Alert, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import styles from './ForgotPassword.module.css';


const ForgotPassword = ({ isAuthenticated }) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const postReq = async ({ email }) => {
        const body = JSON.stringify({ email });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post("/api/users/reset", body, config);
            setErrMsg("An reset password link has been sent to your email. Please check your email.");
        } catch (err) {
            setErrMsg(err.response.data.msg);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        postReq({ email });
    }
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
    }, [isAuthenticated, history])
    return (
        <div className={styles.container} >
            <div className={styles.containerHead}>Reset password</div>
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
                    <Col xs="12" className="mx-auto"><Button className={styles.button}>Reset password</Button></Col>
                    <Col xs="12" className="mx-auto"><Link className={styles.link} to="/">Back to home page</Link></Col>
                </Row>
            </Form>
        </div>
    );
}

export default connect(
    state => ({ isAuthenticated: state.auth.isAuthenticated }),
    null
)(ForgotPassword);
