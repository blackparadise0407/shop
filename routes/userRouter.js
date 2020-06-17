const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../model/userModel');
const validate = require('../hapiValidation');
const { auth, mailer } = require('../middlewares');
const userModel = require('../model/userModel');


//METHOD: GET
//PATH: API/USERS/
//FUCN: GET USER BY ID
router.get('/:id', auth, async (req, res, next) => {
    const user = await UserModel.findById(req.params.id).select("-password")
    return res.status(200).send(user)
})

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
    if (error) return res.status(400).send(error.details[0].message)
    //CHECK EMAIL EXISTS OR NOT
    const existedEmail = await UserModel.findOne({ email: email });
    if (existedEmail) return res.status(400).send("Email already exists");
    if (password !== repPassword) return res.status(400).send("Entered passwords do not match");
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
        mailer({ email: user.email, id: user.id });
        return res.status(200).json({
            msg: "Register success",
            id: user.id,
            // token: token
        });
    } catch (error) {
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
        if (!confirmUser) return res.status(400).send("Invalid token");
        if (id === confirmUser.id) {
            if (confirmUser.confirm) return res.status(400).send("Email is already confirmed");
            confirmUser.confirm = true;
        }
        await confirmUser.save();
        return res.status(200).redirect("http://localhost:3000");
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
    if (error) return res.status(400).send(error.details[0].message);

    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid credentials");

    try {
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).send("Invalid credentials");
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


module.exports = router;
