import React from 'react';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ onChange, onSubmit }) => {
    const options = [
        {
            label: "---Sort option---",
            value: "default"
        },
        {
            label: "Price (low - high)",
            value: "priceAsc"
        },
        {
            label: "Price (high - low)",
            value: "priceDesc"
        },
        {
            label: "Name ascending",
            value: "nameAsc"
        },
        {
            label: "Name descending",
            value: "nameDesc"
        },
    ]
    return (
        <Form className={styles.container} onSubmit={onSubmit}>
            <FormGroup className={styles.formContainer}>
                <Input className={styles.input} type="select" name="filterBy" id="filterBy" onChange={onChange}>
                    {/* <option selected hidden value="default">--Sort option--</option>
                    <option value="priceAsc" >Price ascending</option>
                    <option value="priceDesc" >Price descending</option>
                    <option value="nameAsc" >Name ascending</option>
                    <option value="nameDesc">Name descending</option> */}
                    {options ? options.map(option => <option key={option.value} value={option.value} >{option.label}</option>) : null}
                </Input>
            </FormGroup>
            <Button className={styles.btn}>Sort</Button>
        </Form>

    );
}

Filter.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

export default Filter;
