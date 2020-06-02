import React, { useState } from 'react';
import { Form, FormGroup, Label, Row, Col, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import styles from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        const user = { email, password };
        e.preventDefault();
        console.log(user);

    }
    return (
        <div className={styles.container}>
            <div className={styles.containerHead}>Login</div>
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

export default Login;
