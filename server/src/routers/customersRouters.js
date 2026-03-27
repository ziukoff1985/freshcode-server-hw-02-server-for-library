const { Router } = require('express');
const booksController = require('../controllers/customersController');

const router = new Router();

router
    .route('/')
    .get(booksController.getAllCustomers)
    .post(booksController.createCustomer)
    .put(booksController.updateCustomer);

router
    .route('/:customerId')
    .get(booksController.getCustomerById)
    .delete(booksController.deleteCustomer);

module.exports = router;
