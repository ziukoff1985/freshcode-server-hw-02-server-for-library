const { Router } = require('express');
// ----------------------------------
const authorController = require('../controllers/authorsController');
const { validate } = require('../middleware/index');
// ----------------------------------
const router = new Router();

const { validateAuthor } = validate;

router
    .route('/')
    .get(authorController.getAllAuthors)
    .post(validateAuthor, authorController.createAuthor)
    .put(validateAuthor, authorController.updateAuthor);

router
    .route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

module.exports = router;
