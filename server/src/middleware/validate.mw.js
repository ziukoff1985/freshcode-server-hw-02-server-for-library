const schemas = require('../utils/validationSchemas');
// ----------------------------------
const validateBook = async (req, res, next) => {
    const { body } = req;

    try {
        const validatedBook = await schemas.BOOK_VALIDATION_SCHEMA.validate(
            body,
            {
                abortEarly: false,
            },
        );
        req.body = validatedBook;
        next();
    } catch (error) {
        next(error);
    }
};

const validateAuthor = async (req, res, next) => {
    const { body } = req;

    try {
        const validatedAuthor = await schemas.AUTHOR_VALIDATION_SCHEMA.validate(
            body,
            {
                abortEarly: false,
            },
        );
        req.body = validatedAuthor;
        console.log(req.body);
        next();
    } catch (error) {
        next(error);
    }
};

const validateCustomer = async (req, res, next) => {
    const { body } = req;

    try {
        const validatedCustomer =
            await schemas.CUSTOMER_VALIDATION_SCHEMA.validate(body, {
                abortEarly: false,
            });
        req.body = validatedCustomer;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    validateBook,
    validateAuthor,
    validateCustomer,
};
