const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();


const UserModel = require('../model/userModel');
const validate = require('../hapiValidation');
const { auth, mailer } = require('../middlewares');
const userModel = require('../model/userModel');
const productModel = require('../model/productModel');


//METHOD: GET
//PATH: API/USERS/
//FUCN: GET USER BY ID
// router.get('/:id', auth, async (req, res, next) => {
//     const user = await UserModel.findById(req.params.id).select("-password")
//     return res.status(200).send(user)
// })

//METHOD: GET
//PATH: API/USERS/
//FUCN: GET USER WITH TOKEN
router.get('/', auth, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})
//METHOD: POST
//PATH: api/users/register
//FUCN: REGISTER USER
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
        res.status(400).json({ msg: "Register failed" });
        next(error)
    }
})

//METHOD: GET
//PATH: api/users/confirm/:id
//FUCN: CONFIRM USER EMAIL

router.get('/confirm/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const confirmUser = await userModel.findById(id);
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
//FUCN: LOGIN USER
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
        const user = await userModel.findByIdAndUpdate(decode.id, { password: hashedPass });
        mailer({ email: user.email, value: newPass }, "ResetGet")
        return res.status(200).redirect("http://localhost:3000");
    } catch (error) {
        next(error)
    }
})

//METHOD: POST
//ROUTE: /api/users/cart
//FUNC: add product to each user cart

router.post('/cart', auth, async (req, res, next) => {
    const { id } = req.user;
    const { id: proID } = req.body;
    try {
        const user = await userModel.findById(id);
        if (!user) return res.status(400).json({ msg: "Something wrong..." });
        const product = await productModel.findById(proID);
        if (!product) return res.status(404).json({ msg: "Product does not exists" });
        let existed_item = user.cart.find(item => String(item._id) === String(product._id));
        if (existed_item) {
            //IF FOUND ITEM
            let index = user.cart.indexOf(existed_item);
            user.cart[index].quantity += 1;
            await user.save();
            return res.status(200).json({ msg: "Quantity updated" })
        } else {
            //NEW ITEM
            user.cart.push(product.id);
            await user.save();
            return res.status(200).json({ msg: "Added to bag!" })
        }
        //await user.cart.push(proID);
        //await user.save();
        //return res.status(200).json({ msg: "Added to bag!" });
    } catch (error) {
        next(error);
    }
})


module.exports = router;