const express = require('express');
const router = express.Router();
const CategoryModel = require('../model/categoryModel');
const validate = require('../hapiValidation');
const middleware = require('../middlewares');


//METHOD: GET
//ROUTE: /api/category/
//FUNC: GET ALL CATEGORIES
router.get("/", async (req, res, next) => {
    try {
        const cat = await CategoryModel.find()
        return res.status(200).json({ results: cat, msg: "Success", status: res.statusCode })
    } catch (error) {
        next(error);
    }
})

//METHOD: POST
//ROUTE: /api/category/
//FUNC: ADD A CATEGORY
router.post('/', middleware.auth, async (req, res, next) => {
    const { name } = req.body;
    const { error } = validate.addCatValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    const existCat = await CategoryModel.findOne({ name: name });
    if (existCat) return res.status(400).json({ msg: "Category already exists" });
    try {
        const newCat = new CategoryModel({
            name
        })
        await newCat.save();
        return res.status(200).json({ msg: "Add category success" });
    } catch (error) {
        next(error);
    }
})

module.exports = router;
