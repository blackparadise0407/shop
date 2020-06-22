import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Col, Row, Button, Alert } from 'reactstrap';
import styles from './Product.module.css';

import { updateProduct } from '../../redux/actions/productAction';


const EditProduct = ({
    updateProduct,
    isLoading,
    status,
    error
}) => {
    const { productID } = useParams();
    const [msg, setMsg] = useState("");
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = (e) => { setName(e.target.value); }
    const handlePriceChange = (e) => { setPrice(e.target.value); }
    const handleStockChange = (e) => { setStock(e.target.value); }
    const handleDescriptionChange = (e) => { setDescription(e.target.value); }

    const handleImageChange = e => {
        const err = [];
        const imgArr = [];
        const img = e.target.files;
        if (img.length < 3) {
            err.push(1);
            alert("Must select 3 or more images");
        } else {
            for (let i = 0; i < img.length; i++) {
                if (img[i].type !== "image/jpeg" && img[i].type !== "image/jpg" && img[i].type !== "image/png") {
                    err.push(1);
                    alert("Invalid file type");
                    break;
                } else imgArr.push(img[i]);
            }
        }
        if (err.length > 0) return;
        else setImages(imgArr);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        //Attemp to update product;
        const body = { name, stock, price, description, images };
        console.log(body);
        updateProduct(body, productID);
    }
    useEffect(() => {
        if (error) {
            setMsg(error)
        } else setMsg("");
        if (status !== null) {
            setMsg(status);
        }
    }, [status, error])
    return (
        <div className={styles.container}>
            {msg ? <Alert className={styles.alert}>{msg}</Alert> : null}
            <Form onSubmit={handleOnSubmit}>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <Label htmlFor="name">Product name</Label>
                            <Input
                                className={styles.input}
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <FormGroup>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                className={styles.input}
                                id="stock"
                                name="stock"
                                type="number"
                                value={stock}
                                onChange={handleStockChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                className={styles.input}
                                id="price"
                                name="price"
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                className={styles.input}
                                id="description"
                                name="description"
                                type="textarea"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <Label htmlFor="description">Image</Label>
                            <Input
                                className={styles.inputUpload}
                                multiple
                                type="file"
                                onChange={handleImageChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button className={styles.button}>Submit</Button> {isLoading ? <div>Loading...</div> : null}
            </Form>
        </div>
    );
}

EditProduct.propTypes = {
    updateProduct: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    status: PropTypes.string,
    error: PropTypes.string
}

const mapStateToProps = state => ({
    isLoading: state.products.isLoading,
    status: state.products.status,
    error: state.error.msg,
})

export default connect(
    mapStateToProps,
    { updateProduct }
)(EditProduct);
