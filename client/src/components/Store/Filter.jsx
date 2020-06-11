import React, { useState } from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ onChange, onSubmit }) => {
    return (
        <Form form className={styles.container} onSubmit={onSubmit}>
            <FormGroup>
                <Label for="exampleSelect">Sort by</Label>
                <Input type="select" name="filterBy" id="filterBy" onChange={onChange}>
                    <option value="priceAsc" >Price ascending</option>
                    <option value="priceDesc" >Price descending</option>
                    <option value="nameAsc" >Name ascending</option>
                    <option value="nameDesc">Name descending</option>
                </Input>
            </FormGroup>
            <Button>Click me for magic</Button>
        </Form>

    );
}

Filter.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

export default Filter;
