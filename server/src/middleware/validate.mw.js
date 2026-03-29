const yup = require('yup');

const validateBook = async (req, res, next) => {
    const { body } = req;
    const BOOK_VALIDATION_SCHEMA = yup.object().shape({
        title: yup.string().required('Book title is required'),
        genre: yup.string().required('Book genre is required'),
        shelf: yup.string().required('Book shelf is required'),
        description: yup.string(),
        image: yup.string(),
    });

    try {
        const validatedBook = await BOOK_VALIDATION_SCHEMA.validate(body, {
            abortEarly: false,
        });
        req.body = validatedBook;
        next();
    } catch (error) {
        next(`Error: ${error}`);
    }
};

const validateAuthor = async (req, res, next) => {
    const { body } = req;
    const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
        full_name: yup.string().required('Full name is required'),
        email: yup.string().email('Invalid email format').required(),
        nationality: yup.string(),
    });

    try {
        const validatedAuthor = await AUTHOR_VALIDATION_SCHEMA.validate(body, {
            abortEarly: false,
        });
        req.body = validatedAuthor;
        next();
    } catch (error) {
        next(`Error: ${error}`);
    }
};

const validateCustomer = async (req, res, next) => {
    const { body } = req;
    const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
        full_name: yup.string().required('Full name is required'),
        email: yup.string().email('Invalid email format').required(),
        phone: yup.string(),
        password: yup.string().required('Password is required'),
    });

    try {
        const validatedCustomer = await CUSTOMER_VALIDATION_SCHEMA.validate(
            body,
            {
                abortEarly: false,
            },
        );
        req.body = validatedCustomer;
        next();
    } catch (error) {
        next(`Error: ${error}`);
    }
};

module.exports = {
    validateBook,
    validateAuthor,
    validateCustomer,
};
