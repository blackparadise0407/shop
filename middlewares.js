const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Unauthorized, no token provided");
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

module.exports = {
    notFound,
    errorHandler,
    auth
}