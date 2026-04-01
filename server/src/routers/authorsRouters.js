const { Router } = require('express');
// ----------------------------------
const authorController = require('../controllers/authorsController');
const { validateBody } = require('../middleware/index');
const { AUTHOR_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// ----------------------------------
const router = new Router();

router
    .route('/')
    .get(authorController.getAllAuthors)
    .post(validateBody(AUTHOR_VALIDATION_SCHEMA), authorController.createAuthor)
    .put(validateBody(AUTHOR_VALIDATION_SCHEMA), authorController.updateAuthor);

router
    .route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

module.exports = router;
