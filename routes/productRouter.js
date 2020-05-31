const express = require('express');
const router = express.Router();
const ProductModel = require('../model/productModel');
const CategoryModel = require('../model/categoryModel');
const { auth } = require('../middlewares');

const validate = require('../validation/productValidation');

//METHOD: GET
//ROUTE: /api/product/
//FUCN: GET ALL PRODUCTS
router.get('/', async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 0;
    const page = parseInt(req.query.page) || 0;
    const total = await ProductModel.find().countDocuments();
    const startIndex = (page - 1) * limit;
    try {
        if (page <= 0) {
            const products = await ProductModel.find();
            return res.status(200).json({ results: products, total })
        } else {
            const products = await ProductModel.find().skip(startIndex).limit(limit).exec();
            return res.status(200).json({ results: products, page, limit, total })
        }
    } catch (error) {
        next(error);
    }
})

//METHOD: POST
//ROUTE: /api/product/
//FUCN: ADD A PRODUCTS
router.post('/', auth, async (req, res, next) => {
    const { productID, name, category, stock, price, description } = req.body;
    const { error } = validate.addProduct(req.body);
    if (error) next(error);
    try {
        const cat = await CategoryModel.findOne({ name: category });
        const existProduct = await ProductModel.findOne({ name })
        if (existProduct) return res.status(400).send("Product already exists");
        const newProduct = new ProductModel({
            productID,
            name,
            category: {
                id: cat._id,
                name: cat.name
            },
            stock,
            price,
            description
        })
        await newProduct.save();
        return res.status(200).send("Add product success");
    } catch (error) {
        next(error)
    }
})

module.exports = router;