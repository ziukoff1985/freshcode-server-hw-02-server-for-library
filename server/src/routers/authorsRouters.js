// const router = require('express').Router();
// * імпортуємо клас Router з бібліотеки express
const { Router } = require('express');

const authorController = require('../controllers/authorsController');

// * створюємо екземпляр класу Router
const router = new Router();

// * додаємо маршрути за допомогою методу route
router
    .route('/')
    .get(authorController.getAllAuthors)
    .post(authorController.createAuthor)
    .put(authorController.updateAuthor);

router
    .route('/:authorId')
    .get(authorController.getAuthorById)
    .delete(authorController.deleteAuthor);

// * додаємо маршрути без використання методу route
// router.get('/authors', authorController.getAllAuthors);
// router.get('/authors/:authorId', authorController.getAuthorById);
// router.post('/authors', authorController.createAuthor);
// router.put('/authors', authorController.updateAuthor);
// router.delete('/authors/:authorId', authorController.deleteAuthor);

module.exports = router;
