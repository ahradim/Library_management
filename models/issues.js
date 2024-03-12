const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    userRegNo: Number,
    userName: String,
    userExpDate: String,
    title: String,
    isbn: Number,
    author: String,
    publication: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Issue', issueSchema);