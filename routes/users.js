const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middlewares');
const users = require('../controllers/users')

router.get('/signup', users.renderSignUpForm);

router.post('/signup', catchAsync(users.signUp));

router.get('/login', users.renderLogInForm);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.logIn);

router.get('/logout', users.logOut);

module.exports = router;