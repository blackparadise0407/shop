import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Label, Col, Row, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types';
import styles from './Product.module.css';

import { addProduct } from '../../redux/actions/productAction';
import { useHistory } from 'react-router-dom';


const AddProduct = ({
    addProduct,
    isAuthenticated,
}) => {
    const history = useHistory();
    const [avaiCat, setAvaiCat] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = e => { setName(e.target.value); }
    const handleCategoryChange = e => { setCategory(e.target.value); }
    const handleStockChange = e => { setStock(e.target.value); }
    const handlePriceChange = e => { setPrice(e.target.value); }
    const handleDescriptionChange = e => { setDescription(e.target.value); }

    const configCat = async () => {
        try {
            const res = await axios.get('/api/categories');
            setAvaiCat(res.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        const newProduct = { name, category, price, stock, description };
        addProduct(newProduct);
    }

    useEffect(() => {
        configCat();
        if (isAuthenticated !== null) {
            if (!isAuthenticated) {
                history.push("/");
            }
        }
    }, [isAuthenticated, history])
    return (
        <div className={styles.container}>
            <h2 className={styles.containerHead}>Add a product</h2>
            <Form onSubmit={handleOnSubmit}>
                <Row>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="name">Product name</Label>
                            <Input
                                className={styles.input}
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="4">
                        <FormGroup>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                className={styles.inputSelect}
                                id="category"
                                name="category"
                                type="select"
                                onChange={handleCategoryChange}
                            >
                                <option value="">---Select a category---</option>
                                {avaiCat ? avaiCat.map(cat => (<option className={styles.option} key={cat._id} value={cat.name}>{cat.name}</option>)) : null}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="4">
                        <FormGroup>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                className={styles.input}
                                id="price"
                                name="price"
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="4">
                        <FormGroup>
                            <Label style={{ color: "#fff" }} htmlFor="stock">Stock</Label>
                            <Input
                                className={styles.input}
                                id="stock"
                                name="stock"
                                type="number"
                                value={stock}
                                onChange={handleStockChange}
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                className={`${styles.input} ${styles.textarea}`}
                                id="description"
                                name="description"
                                type="textarea"
                                value={description}
                                onChange={handleDescriptionChange}
                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <Button className={styles.button}>Submit</Button>
                    </Col>
                </Row>
            </Form>
            <ToastContainer style={{ fontFamily: "var(--main-font)", fontSize: "1.4rem" }} autoClose={3000} />
        </div>
    );
}

AddProduct.propTypes = {
    addProduct: PropTypes.func,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
    mapStateToProps,
    { addProduct }
)(AddProduct);
