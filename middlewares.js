const { bookSchema, issueSchema } = require('./schemas.js');
const expressError = require('./utils/expressError');
const User = require('./models/users')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validatebook = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateIssue = (req, res, next) => {
    const { error } = issueSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400);
    } else {
        next();
    }
}


module.exports.isAdmin = async (req, res, next) => {
    const admin = req.user.admin;
    console.log(admin)
    if (!admin) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect('/books')
    }
    next();
}

module.exports.isStudent = async (req, res, next) => {
    const student = req.user.admin;
    console.log(student)
    if (student) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect('/books')
    }
    next();
}
