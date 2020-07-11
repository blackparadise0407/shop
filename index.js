const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const { notFound, errorHandler, upload } = require('./middlewares');

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(`Error connected to DB, errMsg: ${err}`));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.get("/", (req, res) => {
    res.json({ msg: "Hello" })
})
app.use("/api/users", require('./routes/userRouter'));
app.use("/api/products", require('./routes/productRouter'));
app.use("/api/categories", require('./routes/categoryRouter'));

//ERROR MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));