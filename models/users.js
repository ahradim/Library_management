const { boolean } = require("joi");
const mongoose = require("mongoose");
const passpostLocalMongoose = require('passport-local-mongoose')
const Schmea = mongoose.Schema;

const userSchema = new Schmea({
    regno: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});


userSchema.plugin(passpostLocalMongoose);

module.exports = mongoose.model('User', userSchema);