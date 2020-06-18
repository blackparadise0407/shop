import React, { Fragment, useState } from 'react';
import { Form, Alert, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        alert("hehe");
    }
    return (
        <div className={styles.container}>
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
                    <Col xs="12"><div className="loginDes">Doesn't have an account? <Link to="/register" className={styles.link}>Register here</Link></div></Col>
                </Row>
            </Form>
        </div>
    );
}

export default ForgotPassword;
