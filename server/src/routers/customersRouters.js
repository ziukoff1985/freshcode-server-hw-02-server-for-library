const { Router } = require('express');
// ----------------------------------
const customersController = require('../controllers/customersController');
const { validateCustomer } = require('../middleware/validate.mw');
// ----------------------------------
const router = new Router();

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
