const { Router } = require('express');
// ----------------------------------
const customersController = require('../controllers/customersController');
const { validateBody } = require('../middleware/index');
const { CUSTOMER_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// ----------------------------------
const router = new Router();

router
    .route('/')
    .get(customersController.getAllCustomers)
    .post(
        validateBody(CUSTOMER_VALIDATION_SCHEMA),
        customersController.createCustomer,
    )
    .put(
        validateBody(CUSTOMER_VALIDATION_SCHEMA),
        customersController.updateCustomer,
    );

router
    .route('/:customerId')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;
