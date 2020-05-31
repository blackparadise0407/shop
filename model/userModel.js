const { Schema, model } = require('mongoose');

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
    wallet: {
        type: Number,
        default: 0
    }
})

module.exports = model("users", UserSchema);