import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const toggle = () => { setModal(!modal); }
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        alert("Submit");
    }
    return (
        <div style={{ zIndex: 25000, opacit: 1 }}>
            <Link to="#" onClick={toggle}>Forgot password</Link>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Reset password</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                className="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormGroup>
                        <Button>Reset password</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ForgotPassword;
