const { Router } = require('express');
// ----------------------------------
const customersController = require('../controllers/customersController');
const { validate } = require('../middleware/index');
// ----------------------------------
const router = new Router();

const { validateCustomer } = validate;

router
    .route('/')
    .get(customersController.getAllCustomers)
    .post(validateCustomer, customersController.createCustomer)
    .put(validateCustomer, customersController.updateCustomer);

router
    .route('/:customerId')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;
