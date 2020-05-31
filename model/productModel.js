const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const productSchema = new mongoose.Schema({
    productID: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'
        },
        name: String
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

productSchema.plugin(autoIncrement, { id: 'product_secq', inc_field: 'productID' });

module.exports = mongoose.model("Products", productSchema);
