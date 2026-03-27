const { Router } = require('express');

const booksController = require('../controllers/booksController');

const router = new Router();

router
    .route('/')
    .get(booksController.getAllBooks)
    .post(booksController.createBook)
    .put(booksController.updateBook);

router
    .route('/:bookId')
    .get(booksController.getBookById)
    .delete(booksController.deleteBook);

module.exports = router;
