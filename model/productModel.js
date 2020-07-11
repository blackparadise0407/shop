const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const ProductSchema = new mongoose.Schema({
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
    },
    images: [String],
})

ProductSchema.plugin(autoIncrement, { id: 'product_secq', inc_field: 'productID' });
ProductSchema.index({ name: 'text', 'category.name': 'text' });

module.exports = mongoose.model("products", ProductSchema);
