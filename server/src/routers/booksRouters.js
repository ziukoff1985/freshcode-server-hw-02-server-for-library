const { Router } = require('express');
// ----------------------------------
const booksController = require('../controllers/booksController');
const { validateBody } = require('../middleware/index');
const { BOOK_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// ----------------------------------
const router = new Router();

router
    .route('/')
    .get(booksController.getAllBooks)
    .post(validateBody(BOOK_VALIDATION_SCHEMA), booksController.createBook)
    .put(validateBody(BOOK_VALIDATION_SCHEMA), booksController.updateBook);

router
    .route('/:bookId')
    .get(booksController.getBookById)
    .delete(booksController.deleteBook);

module.exports = router;
