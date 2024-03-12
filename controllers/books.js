const Book = require('../models/books');
const { cloudinary } = require('../cloudinary');
const User = require('../models/users');


module.exports.index = async (req, res) => {
    const books = await Book.find({});
    res.render('pages/books', { books });
}

module.exports.renderNewForm = (req, res) => {
    res.render('pages/new');
}

module.exports.createBook = async (req, res) => {
    const book = new Book(req.body.book);
    book.cover = {
        url: req.file.path,
        filename: req.file.filename
    }
    await book.save();
    req.flash('success', 'Successfully added a new Book!');
    res.redirect(`/books/${book._id}`);
}

module.exports.showBook = async (req, res) => {
    // const { id } = req.params;
    const book = await Book.findById(req.params.id);
    if (!book) {
        req.flash('error', 'No book found');
        return res.redirect('/books');
    }
    res.render('pages/show', { book })
}

module.exports.renderEditForm = async (req, res) => {
    // const { id } = req.params;
    const book = await Book.findById(req.params.id);
    if (!book) {
        req.flash('error', 'No book found');
        return res.redirect('/books');
    }
    res.render('pages/edit', { book })
}

module.exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book });

    if (req.file) {
        const item = await Book.findById(id);
        const bookImg = item.cover[0].filename;
        // console.log(bookimg);
        await cloudinary.uploader.destroy(bookImg);
        book.cover = { url: req.file.path, filename: req.file.filename }
        await book.save();
    }

    req.flash('success', 'Successfully updated a Book!')
    res.redirect(`/books/${book._id}`);
}

module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    const item = await Book.findById(id);
    const bookImg = item.cover[0].filename;
    // console.log(bookimg);
    await cloudinary.uploader.destroy(bookImg);
    await Book.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted a Book!')
    res.redirect('/books');
}