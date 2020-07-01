const express = require('express');
const router = express.Router();
const ProductModel = require('../model/productModel');
const CategoryModel = require('../model/categoryModel');
const { auth, upload, validateUpload } = require('../middlewares');

const validate = require('../hapiValidation');

//METHOD: GET
//ROUTE: /api/product/
//FUCN: GET ALL PRODUCTS
router.get('/', async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 0;
    const page = parseInt(req.query.page) || 0;
    const total = await ProductModel.find().countDocuments();
    const startIndex = (page - 1) * limit;
    const totalPage = Math.ceil(total / limit);
    try {
        if (page > totalPage) return res.status(400).json({ msg: "Current page exceed total page", status: res.statusCode })
        if (page <= 0) {
            const products = await ProductModel.find();
            return res.status(200).json({ results: products, msg: "Success", status: res.statusCode, total })
        } else {
            const products = await ProductModel.find().skip(startIndex).limit(limit).exec();
            return res.status(200).json({ results: products, msg: "Success", status: res.statusCode, page, limit, total, totalPage })
        }
    } catch (error) {
        next(error);
    }
})

//METHOD: POST
//ROUTE: /api/product/
//FUCN: ADD A PRODUCTS
router.post('/', async (req, res, next) => {
    const { productID, name, category, stock, price, description } = req.body;
    const { error } = validate.addProductValidation(req.body);
    if (error) next(error);
    try {
        const cat = await CategoryModel.findOne({ name: category });
        if (!cat) return res.status(400).json({ msg: "Category does not exist" });
        const existProduct = await ProductModel.findOne({ name })
        if (existProduct) return res.status(400).json({ msg: "Product already exists" });
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
        const resp = await newProduct.save();
        cat.products.push(newProduct);
        await cat.save();
        return res.status(200).json({ msg: "Add product success", resp });
    } catch (error) {
        next(error)
    }
});

router.post('/:productID/update', validateUpload, upload.array('images', 3), async (req, res, next) => {
    const productID = req.params.productID;
    const { name, price, stock, description } = req.body;
    const { error } = validate.updateProductValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message })
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push(url + "/api/uploads/" + req.files[i].filename);
    }
    try {
        const product = await ProductModel.findOneAndUpdate({ productID }, { $set: { name, price, stock, description, images: reqFiles } });
        if (!product) res.status(400).json({ msg: "Product does not exist" });
        res.status(200).json({ msg: "Update product success" });
    } catch (err) {
        next(err);
    }
})



//METHOD: GET
//ROUTE: /api/product/search
//FUCN: FILTER SEARCH
router.get('/search', async (req, res, next) => {
    try {
        const filter = req.query.filterBy;
        const limit = parseInt(req.query.limit) || 6;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * limit;
        const total = await ProductModel.countDocuments();
        const totalPage = Math.ceil(total / limit);
        if (!filter) {
            try {
                const q = req.query.q;
                const products = await ProductModel.find({ $text: { $search: q } }).limit(limit);
                return res.status(200).json({
                    results: products,
                    msg: "Success",
                    status: res.statusCode

                })
            } catch (error) {
                next(error);
            }
        }
        if (filter === "default") {
            try {
                const products = await ProductModel.find().skip(startIndex).limit(limit).exec();
                return res.status(200).json({
                    results: products,
                    msg: "Success",
                    status: res.statusCode,
                    limit,
                    page,
                    total,
                    totalPage
                })
            } catch (error) {
                next(error);
            }
        } else {
            if (filter === 'priceAsc') {
                const products = await ProductModel.find().sort({ price: "asc" }).skip(startIndex).limit(limit).exec();
                return res.status(200).json({
                    results: products,
                    msg: "Success",
                    status: res.statusCode,
                    limit,
                    page,
                    total,
                    totalPage
                })
            }
            if (filter === 'priceDesc') {
                const products = await ProductModel.find().sort({ price: "desc" }).skip(startIndex).limit(limit).exec();
                return res.status(200).json({
                    results: products,
                    msg: "Success",
                    status: res.statusCode,
                    limit,
                    page,
                    total,
                    totalPage
                })
            }
            if (filter === 'nameAsc') {
                const products = await ProductModel.find().sort({ name: "asc" }).skip(startIndex).limit(limit).exec();
                return res.status(200).json({
                    results: products,
                    msg: "Success",
                    status: res.statusCode,
                    limit,
                    page,
                    total,
                    totalPage
                })
            }
            if (filter === 'nameDesc') {
                const products = await ProductModel.find().sort({ name: "Desc" }).skip(startIndex).limit(limit).exec();
                return res.status(200).json({
                    results: products,
                    msg: "Success",
                    status: res.statusCode,
                    limit,
                    page,
                    total,
                    totalPage
                })
            }
        }
    } catch (error) {
        next(error)
    }
})


//METHOD: GET
//ROUTE: /api/products/:productID
//FUNC: GET SINGLE PRODUCT BY PRODUCT ID
router.get("/:productID", async (req, res, next) => {
    const productID = req.params.productID;
    try {
        const product = await ProductModel.findOne({ productID });
        if (!product) return res.status("400").json({ msg: "Product does not exist" })
        return res.status(200).json({
            results: product,
            status: res.statusCode,
            msg: "Success"
        })
    } catch (err) {
        next(err);
    }

})

//METHOD: GET
//ROUTE: /api/products/:id
//FUNC: GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await ProductModel.findById(id);
        if (!product) return res.status("400").json({ msg: "Product does not exist" })
        return res.status(200).json({
            results: product,
            status: res.statusCode,
            msg: "Success"
        })
    } catch (err) {
        next(err);
    }

})

module.exports = router;