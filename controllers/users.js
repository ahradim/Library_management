const User = require('../models/users');

module.exports.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

module.exports.signUp = async (req, res) => {
    try {
        let isAdmin;
        const role = await User.find({});
        for (let r of role) {
            if (r.admin) {
                isAdmin = true;
                break;
            }
        }
        if (isAdmin) {
            const { fullname, username, regno, email, password } = req.body;
            const newUser = new User({ fullname, username, regno, email });
            const registerdUser = await User.register(newUser, password);
            req.login(registerdUser, err => {
                if (err) {
                    return next(err)
                }
                req.flash('success', `Welcome to FEC Library ${fullname}`);
                res.redirect('/books');
            })
        } 
        // else {
        //     const { fullname, username, regno, email, password } = req.body;
        //     const newUser = new User({ fullname, username, regno, email, admin: true });
        //     const registerdUser = await User.register(newUser, password);
        //     req.login(registerdUser, err => {
        //         if (err) {
        //             return next(err)
        //         }
        //         req.flash('success', `Welcome to FEC Library ${fullname}`);
        //         res.redirect('/books');
        //     })
        // }
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup')
    }
}

module.exports.renderLogInForm = (req, res) => {
    res.render('users/login');
}

module.exports.logIn = async (req, res) => {
    req.flash('success', 'Welcome Back');
    const redirectTo = res.locals.returnTo || '/books'
    res.redirect(redirectTo)
}

module.exports.logOut = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'GoodBye');
        res.redirect('/books');
    });
}