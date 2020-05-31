const express = require('express');
const router = express.Router();
const CategoryModel = require('../model/categoryModel');
const validate = require('../validation/categoryValidation');

//METHOD: POST
//ROUTE: /api/category/
//FUNC: ADD A CATEGORY
router.post('/', async (req, res, next) => {
    const { catID, name } = req.body;
    const { error } = validate.addCat(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const newCat = new CategoryModel({
            catID,
            name
        })
        await newCat.save();
        return res.status(200).send("Add category success");
    } catch (error) {
        next(error);
    }
})

module.exports = router;
