const Issue = require('../models/issues');
const Book = require('../models/books');


//user controller
module.exports.myIssuedBook = async (req, res) => {
    const issues = await Issue.find({ userRegNo: req.user.regno })
    res.render('issues/me', { issues })
}

//admin controllers
module.exports.allIssues = async (req, res) => {
    const issues = await Issue.find({});
    res.render('issues/issues', { issues });
}

module.exports.renderIssuerForm = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    // console.log(book);
    res.render('issues/new', { book });
}


module.exports.createIssuer = async (req, res) => {
    const issue = new Issue(req.body.issue);
    await issue.save();
    req.flash('success', `Successfully issued to ${issue.userName}`)
    res.redirect('/books/issues');
}


module.exports.renderRessuerForm = async (req, res) => {
    const { id } = req.params;
    const book = await Issue.findById(id);
    // console.log(book);
    res.render('issues/reissue', { book });
}


module.exports.updateIssuer = async (req, res) => {
    const { id } = req.params;
    const updatedIssueData = req.body.issue;
    const updatedIssue = await Issue.findByIdAndUpdate(id, { ...updatedIssueData }, { new: true });
    // console.log(updatedIssue);
    res.redirect('/books/issues');
}


module.exports.returnedBook = async (req, res) => {
    await Issue.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully Got back the issued Book')
    res.redirect('/books/issues');
}
