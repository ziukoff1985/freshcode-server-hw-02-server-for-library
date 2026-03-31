const { Router } = require('express');
// ----------------------------------
const authorController = require('../controllers/authorsController');
const { validateAuthor } = require('../middleware/validate.mw');
// ----------------------------------
const router = new Router();

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
