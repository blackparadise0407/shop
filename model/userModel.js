const { Schema, model, Mongoose } = require('mongoose');

const requireString = {
    type: String,
    required: true
}

const UserSchema = new Schema({
    firstName: requireString,
    lastName: requireString,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: requireString,
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    confirm: {
        type: Boolean,
        default: false
    },
    avatar: String,
    cart: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
})

module.exports = model("users", UserSchema);