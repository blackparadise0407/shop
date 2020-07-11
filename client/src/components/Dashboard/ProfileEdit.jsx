import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Row, Col, Button } from 'reactstrap';

const ProfileEdit = ({
    confirm,
    values,
    handleSubmit,
    setFieldValue
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            {!confirm ? "Your account is not confirmed yet. Please follow the link sent within your email to confirm your account." : null}
            <Row form><Col xs={12}><input type="file" name="avatar" value={values.avatar} onChange={(e) => {
                setFieldValue("file", e.currentTarget.files[0])
            }} /></Col></Row>
            <Row form>
                <Col xs={12} sm={6}><Field type="text" name="firstName" placeholder="First name" value={values.firstName} /></Col>
                <Col xs={12} sm={6}><Field type="text" name="lastName" placeholder="Last name" value={values.lastName} /></Col>
            </Row>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

const FormikForm = withFormik({
    mapPropsToValues: ({ firstName, lastName }) => ({
        firstName: firstName || '',
        lastName: lastName || '',
    }),
    handleSubmit: (values) => {
        console.log(values);
    }
})(ProfileEdit)

export default FormikForm
