const { Router } = require('express');
// ----------------------------------
const booksController = require('../controllers/booksController');
const { validate } = require('../middleware/index');
// ----------------------------------
const router = new Router();

const { validateBook } = validate;

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
