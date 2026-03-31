const { Router } = require('express');
// ----------------------------------
const authorsRouter = require('./authorsRouters');
const booksRouter = require('./booksRouters');
const customersRouter = require('./customersRouters');
// ----------------------------------

const router = new Router();

router.use('/authors', authorsRouter);
router.use('/books', booksRouter);
router.use('/customers', customersRouter);

module.exports = router;
