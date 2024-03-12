const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateIssue, isAdmin, isStudent } = require('../middlewares');
const issues = require('../controllers/issues');




//User routes
router.get('/books/me', isLoggedIn, isStudent, catchAsync(issues.myIssuedBook));


//Admin routes
router.get('/books/issues', isLoggedIn, isAdmin, catchAsync(issues.allIssues));

router.get('/books/:id/issues/new', isLoggedIn, isAdmin, issues.renderIssuerForm);

router.post('/books/issues', isLoggedIn, isAdmin, validateIssue, catchAsync(issues.createIssuer));

router.get('/books/issues/:id/reissue', isLoggedIn, isAdmin, catchAsync(issues.renderRessuerForm));

router.put('/books/issues/:id', isLoggedIn, isAdmin, validateIssue, catchAsync(issues.updateIssuer));

router.delete('/books/issues/:id', isLoggedIn, isAdmin, catchAsync(issues.returnedBook));

module.exports = router;