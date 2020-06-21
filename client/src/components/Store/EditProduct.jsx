import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import styles from './Product.module.css';

import { updateProduct } from '../../redux/actions/productAction';


const EditProduct = ({
    updateProduct
}) => {
    const { productID } = useParams();
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
    return (
        <div className={styles.container}>
            <Form onSubmit={handleOnSubmit}>
                <Row form>
                    <Col xs={12}>
                        <FormGroup>
                            <Label htmlFor="name">Product name</Label>
                            <Input
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
                                multiple
                                type="file"
                                onChange={handleImageChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}

EditProduct.propTypes = {
    updateProduct: PropTypes.func,
}

export default connect(
    null,
    { updateProduct }
)(EditProduct);
