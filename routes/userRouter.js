const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();


const UserModel = require('../model/userModel');
const ProductModel = require('../model/productModel');
const validate = require('../hapiValidation');
const { auth, mailer } = require('../middlewares');



//METHOD: GET
//PATH: API/USERS/
//FUNC: GET USER BY ID
// router.get('/:id', auth, async (req, res, next) => {
//     const user = await UserModel.findById(req.params.id).select("-password")
//     return res.status(200).send(user)
// })

//METHOD: GET
//PATH: API/USERS/
//FUNC: GET USER WITH TOKEN
router.get('/', auth, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password -cart');
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})

//METHOD: POST 
//PATH: api/users/update
//FUNC: UPDATE USER'S INFORMATION
router.post('/update', auth, async (req, res, next) => {
    const { firstName, lastName, avatar, gender, dateOfBirth } = req.body;
    const id = req.user.id;
    try {
        const user = await UserModel.findById(id);
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

//METHOD: POST
//PATH: api/users/register
//FUNC: REGISTER USER
router.post('/register', async (req, res, next) => {
    const { firstName, lastName, email, password, repPassword } = req.body;

    //VALIDATE BEFORE REGISTER
    const { error } = validate.regValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    //CHECK EMAIL EXISTS OR NOT
    const existedEmail = await UserModel.findOne({ email: email });
    if (existedEmail) return res.status(400).json({ msg: "Email already exists" });
    if (password !== repPassword) return res.status(400).json({ msg: "Entered passwords do not match" });
    const newUser = new UserModel({
        firstName, lastName, email, password
    })
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;
    try {
        const user = await newUser.save();
        // const token = jwt.sign(
        //     {
        //         id: user.id
        //     },
        //     process.env.JWT_SECRET,
        //     { expiresIn: 7200 })
        mailer({ email: user.email, value: user.id }, "Confirm");
        return res.status(200).json({
            msg: "Register success",
            id: user.id,
            // token: token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Register failed" });
        next(error)
    }
})

//METHOD: GET
//PATH: api/users/confirm/:id
//FUNC: CONFIRM USER EMAIL

router.get('/confirm/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const confirmUser = await UserModel.findById(id);
        if (!confirmUser) return res.status(400).json({ msg: "Invalid token" });
        if (id === confirmUser.id) {
            if (confirmUser.confirm) return res.status(400).send("<div style=\"width: 100%; height: 100%;display: flex; flex-direction: column;justify-content: center; text-align: center\"><h1 style=\"color: red; \">Email is already confirmed</h1></div>");
            confirmUser.confirm = true;
        }
        await confirmUser.save();
        return res.status(200).redirect("http://localhost:3000/login");
    } catch (error) {
        next(error);
    }
})

//METHOD: POST
//PATH: api/users/login
//FUNC: LOGIN USER
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    //VALIDATE BEFORE LOGIN
    const { error } = validate.logValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    try {
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ msg: "Invalid credentials" });
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            { expiresIn: 7200 })
        return res.status(200).json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                confirm: user.confirm
            },
            msg: "Success",
            status: res.statusCode,
            token: token
        });
    } catch (error) {
        next(error)

    }
})

//METHOD: POST 
//ROUTE: /api/users/reset/:id
//FUNC: reset user password by email

// router.post('/reset', async (req, res, next) => {
//     const { email } = req.body;
//     try {
//         const resetPassword = Math.random().toString().slice(2, 8);
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(resetPassword, salt);
//         const resetUser = await userModel.findOneAndUpdate({ "email": email }, { "password": hashedPassword });
//         if (!resetUser) return res.status(400).json({ msg: "Email does not exist" });
//         mailer({ email, id: resetPassword }, "Reset");
//         return res.status(200).json({ msg: "Your password has been reset" });
//     } catch (error) {
//         next(error)
//     }
// })
//METHOD: POST
//ROUTE: /api/users/reset 
//FUNC: user request reset password link
router.post('/reset', async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Email does not exist" });
        const token = await jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: 7200 })
        mailer({ email, value: token }, "ResetPost")
        return res.status(200).json({ msg: "Email sent" });
    } catch (error) {
        next(error);
    }
})

//METHOD: GET
//ROUTE: /api/users/reset/token 
//FUNC: Reset user's password

router.get('/reset/:token', async (req, res, next) => {
    const token = req.params.token;
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const newPass = Date.now().toString();
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPass, salt);
        const user = await UserModel.findByIdAndUpdate(decode.id, { password: hashedPass });
        mailer({ email: user.email, value: newPass }, "ResetGet")
        return res.status(200).redirect("http://localhost:3000");
    } catch (error) {
        next(error)
    }
})

//METHOD: GET
//ROUTE: /api/users/cart
//FUNC: get all product from each user cart

router.get('/cart', auth, async (req, res, next) => {
    const id = req.user.id;
    try {
        const user = await UserModel.findById(id).populate('cart.product');
        return res.status(200).json({ user });
    } catch (err) {
        next(err)
    }
})

//METHOD: POST
//ROUTE: /api/users/cart
//FUNC: add product to each user cart

router.post('/cart', auth, async (req, res, next) => {
    const id = req.user.id;
    const { productID } = req.body;
    try {
        const user = await UserModel.findById(id);
        const product = await ProductModel.findOne({ productID });
        if (!product) return res.status(404).json({ msg: "Product does not exists" });
        const existed_product = _.find(user.cart, item => (
            item.product.toString() === product.id.toString()
        ))
        if (existed_product) {
            existed_product.quantity += 1;
            await user.save();
            return res.status(200).json({
                cart: user.cart,
                msg: "Quantity updated"
            });
        } else {
            user.cart.push({
                product: product._id
            })
            await user.save();
            return res.status(200).json({
                cart: user.cart,
                msg: "Add product success"
            });
        }
    } catch (error) {
        next(error);
    }
})

//METHOD: DELETE
//ROUTE: /api/users/cart/:productID
//FUNC: add product to each user cart

router.delete('/cart/:productID', auth, async (req, res, next) => {
    const productID = req.params.productID;
    const id = req.user.id;
    try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).json({ msg: "User does not exist" });
        const product = await ProductModel.findOne({ productID });
        if (!product) return res.status(404).json({ msg: "Product does not exist" });
        try {
            await UserModel.update({ "_id": id }, { $pull: { "cart": { "product": product.id } } });
            return res.status(200).json({ msg: "Remove item success" });
        } catch (error) {
            return res.status(400).json({ msg: "Product is already removed" });
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;