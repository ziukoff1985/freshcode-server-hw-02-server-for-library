const { Router } = require('express');

const booksController = require('../controllers/booksController');
const { validateBook } = require('../middleware/validate.mw');

const router = new Router();

router
    .route('/')
    .get(booksController.getAllBooks)
    .post(validateBook, booksController.createBook)
    .put(validateBook, booksController.updateBook);

router
    .route('/:bookId')
    .get(booksController.getBookById)
    .delete(booksController.deleteBook);

module.exports = router;
