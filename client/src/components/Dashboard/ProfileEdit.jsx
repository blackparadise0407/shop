import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Row, Col, Button } from 'reactstrap';
import styles from './Profile.module.css';

import { EditSchema } from '../../helpers/YupValidation';

const ProfileEdit = ({
    confirm,
    values,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
}) => {
    return (
        <>
            <div className={styles.header}>
                Your profile
        </div>
            <Form onSubmit={handleSubmit}>
                {!confirm ? "Your account is not confirmed yet. Please follow the link sent within your email to confirm your account." : null}
                <Row form><Col xs={12}><input type="file" name="avatar" value={values.avatar} onChange={(e) => {
                    setFieldValue("file", e.currentTarget.files[0])
                }} /></Col></Row>
                <Row form>
                    <Col xs={12} sm={6}>
                        <Field type="text" name="firstName" placeholder="First name" value={values.firstName} />
                        {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field type="text" name="lastName" placeholder="Last name" value={values.lastName} />
                        {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                    </Col>
                </Row>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}

const FormikForm = withFormik({
    mapPropsToValues: ({ firstName, lastName }) => ({
        firstName: firstName || '',
        lastName: lastName || '',
    }),
    validationSchema: EditSchema,
    handleSubmit: (values) => {
        console.log(values);
    }
})(ProfileEdit)

export default FormikForm
