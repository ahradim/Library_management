if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}




const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');

const User = require('./models/users');
const expressError = require('./utils/expressError');
const bookRoutes = require('./routes/books');
const issueRoutes = require('./routes/issues');
const userRoutes = require('./routes/users');
const Book = require('./models/books');
const Issue = require('./models/issues');

mongoose.connect('mongodb://localhost:27017/LibraryManagement')
    .then(() => {
        console.log('Connection opened');
    })
    .catch(err => {
        console.log(err);
    });

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
    secret: 'thatshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
}
app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // console.log(req.user);
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/', issueRoutes);
app.use('/books', bookRoutes);


//search book
app.post('/search', async (req, res) => {
    const q = req.body.q;
    try {
        const books = await Book.find({
            $or: [
                { title: new RegExp(q, 'i') },
                { author: new RegExp(q, 'i') },
                { publication: new RegExp(q, 'i') }
            ]
        });
        res.render('pages/books', { books });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error');
    }
});


//search issuer
app.post('/search/issuer', async (req, res) => {
    const q = req.body.q;
    try {
        const searchNumber = parseInt(q);
        const issues = await Issue.find({
            $or: [
                { userName: new RegExp(q, 'i') },
                { userRegNo: isNaN(searchNumber) ? null : searchNumber }
            ]
        });
        res.render('issues/issues', { issues });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error');
    }
});


app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    next(new expressError('PAGE NOT FOUND', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong';
    res.status(statusCode).render('error', { err });
});




app.listen(4040, () => {
    console.log("Serving on port 4040");
});