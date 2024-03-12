const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
});

const bookSchema = new Schema({
    title: String,
    cover: [imageSchema],
    isbn: Number,
    author: String,
    publication: String,
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Book', bookSchema);