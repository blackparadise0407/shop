import React, { useState } from 'react';
import { Form, FormGroup, Label, Row, Col, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import styles from './Login.module.css'

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        const user = { firstName, lastName, email, password };
        e.preventDefault();
        alert(user);

    }
    return (
        <div className={styles.containerRegister}>
            <div className={styles.containerHead}>Register</div>
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
                    <Col xs="12" className="mx-auto"><Button className={styles.button}>Register</Button></Col>
                    <Col xs="12"><div className="registerDes">Already have an account? <Link to="/login" className={styles.link}>Login here</Link></div></Col>
                </Row>
            </Form>
        </div>
    );
}

export default Register;
