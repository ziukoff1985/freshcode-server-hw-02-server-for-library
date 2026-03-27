const { Router } = require('express');

const authorsRouter = require('./authorsRouters');
const booksRouter = require('./booksRouters');
const customersRouter = require('./customersRouters');

const router = new Router();

function log(req, res, next) {
    console.log(req.method, req.url);
    next();
}

router.use('/authors', authorsRouter);
router.use('/books', booksRouter);
router.use('/customers', customersRouter);

module.exports = router;
module.exports.log = log;
