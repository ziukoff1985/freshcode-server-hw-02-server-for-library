const { Router } = require('express');
// ----------------------------------
const authorController = require('../controllers/authorsController');
// const { validate } = require('../middleware/index');
const { validateBody } = require('../middleware/index');
const { AUTHOR_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// ----------------------------------
const router = new Router();

// const {
//     validateBody: { validateBody },
// } = middleware;

// const { validateAuthor } = validate;

router
    .route('/')
    .get(authorController.getAllAuthors)
    // .post(validateAuthor, authorController.createAuthor)
    // .put(validateAuthor, authorController.updateAuthor);
    .post(validateBody(AUTHOR_VALIDATION_SCHEMA), authorController.createAuthor)
    .put(validateBody(AUTHOR_VALIDATION_SCHEMA), authorController.updateAuthor);

router
    .route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

module.exports = router;
