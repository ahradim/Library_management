const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validatebook, isAdmin } = require('../middlewares');
const books = require('../controllers/books')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })


router.get('/', catchAsync(books.index));

router.get('/new', isLoggedIn, isAdmin, books.renderNewForm);

router.post('/', isLoggedIn, isAdmin, upload.single('image'), validatebook, catchAsync(books.createBook));

router.get('/:id', catchAsync(books.showBook));

router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(books.renderEditForm));

router.put('/:id', isLoggedIn, isAdmin, upload.single('image'), validatebook, catchAsync(books.updateBook));

router.delete('/:id', isLoggedIn, isAdmin, catchAsync(books.deleteBook));

module.exports = router;