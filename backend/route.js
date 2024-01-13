const express = require('express');
const wrapAsync = require('./wrapAsync.js');
const joiSchema = require('./validate.js');
const { Book } = require('./model.js');
const router = express.Router();


// router.get('/', (req, res) => {
//     console.log(req);
//     return res.status(200).send({ message: 'Welcome to MERN Stack : GURI' });
// })

// route to save a new book 
router.post('/', wrapAsync(async (req, res) => {
    if (
        !req.body.title ||
        !req.body.author ||
        !req.body.PublishYear
    ) {
        throw new Error('Missing required fields: title, author, PublishYear');
    }
    await joiSchema.validateAsync(req.body);
    const { title, author, PublishYear } = req.body;
    const book = new Book({ title, author, PublishYear });
    await book.save();
    res.send(book);
}
));

// route to get all books
router.get('/', wrapAsync(async (req, res) => {
    const books = await Book.find();
    res.send(books);
}));

// route to get a book by id
router.get('/:id', wrapAsync(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new Error('Book not found');
    }
    res.send(book);
}));

// route to update a book by id
router.put('/:id', wrapAsync(async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!book) {
        throw new Error('Book not found');
    }
    res.send(book);
}));

// route to delete a book by id
router.delete('/:id', wrapAsync(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        throw new Error('Book not found');
    }
    res.send(book);
}));

module.exports = router;