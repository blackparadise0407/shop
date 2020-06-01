import React, { useState } from 'react';
import { Form, FormGroup, Label, Row, Col, Input, Button } from 'reactstrap';
import styles from './Login.module.css'

const Login = () => {
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
        <div className={styles.container}>
            <Form onSubmit={handleSubmit}>
                <Row form>
                    <Col xs="12" sm="6">
                        <FormGroup>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
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
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="******"
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12"><Button>Register</Button>Already have an account? Login here</Col>
                </Row>
            </Form>
        </div>
    );
}

export default Login;
