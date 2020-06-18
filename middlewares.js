const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ msg: "Unauthorized, you are not logged in" });
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // res.status(400).send("Invalid token");
        next(error)
    }
}

const notFound = (req, res, next) => {
    const error = new Error(`Not found: ${req.originalURL}`);
    res.status(404).json({ msg: "Not found", status: res.statusCode });
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ msg: err.message, status: res.statusCode });
}

const mailer = async ({ email, value }, type) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    // send mail with defined transport object
    if (type === "Confirm") {
        let info = await transporter.sendMail({
            from: `"React Shop " <${process.env.EMAIL}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "React Shop Email confirmation", // Subject line
            text: `Hello world?`, // plain text body
            html: `<div class="container" style="font-family:Arial, Helvetica, sans-serif">
                        <p style="font-size: 1rem;">React Shop Email confirmation</p>
                        <p>Click the following link to confirm your account:
                        <a style="text-decoration: none; color: rgb(255, 0, 0)" href="http://localhost:5000/api/users/confirm/${id}"
                            >http://localhost:5000/api/users/confirm/${value}</a>
                        </p>
                        <strong>Please do not reply to this email.</strong>
                        </div >`, // html body
        });
    }
    if (type === "ResetPost") {
        let info = await transporter.sendMail({
            from: `"React Shop " <${process.env.EMAIL}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "React Shop Password Reset", // Subject line
            text: `Hello world?`, // plain text body
            html: `<div class="container" style="font-family:Arial, Helvetica, sans-serif">
                        <p style="font-size: 1rem;">React Shop Password Reset</p>
                        <p>Click the following link to reset your password:
                        <a style="text-decoration: none; color: rgb(255, 0, 0)" href="http://localhost:5000/api/users/reset/${value}"
                        >http://localhost:5000/api/users/reset/${value}</a>
                        </p>
                        <h4>This link will expire in 2 hours</h4>
                        <strong>Please do not reply to this email.</strong>
                    </div >`, // html body
        });
    }
    if (type === "ResetGet") {
        let info = await transporter.sendMail({
            from: `"React Shop " <${process.env.EMAIL}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "React Shop Password Reset", // Subject line
            text: `Hello world?`, // plain text body
            html: `<div class="container" style="font-family:Arial, Helvetica, sans-serif">
                        <p style="font-size: 1rem;">React Shop Password Reset</p>
                        <p>Your new password is: <h2>${value}</h2></p>
                        <strong>Please change your password afterward</strong>
                        <strong>Please do not reply to this email.</strong>
                    </div >`, // html body
        });
    }
    // console.log("Receivers: ", email)
    // console.log("Message sent: %s", info.messageId);

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

module.exports = {
    notFound,
    errorHandler,
    auth,
    mailer
}