const yup = require('yup');
// ----------------------------------

const BOOK_VALIDATION_SCHEMA = yup.object().shape({
    title: yup.string().trim().max(255).required('Book title is required'),
    genre: yup.string().required('Book genre is required'),
    shelf: yup.string().required('Book shelf is required'),
    description: yup.string().nullable(),
    image: yup.string().trim().max(255).nullable(),
});

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup
        .string()
        .trim()
        .min(2)
        .max(50)
        .required('Full name is required'),
    email: yup
        .string()
        .trim()
        .email('Invalid email format')
        .max(255)
        .required('Email is required'),
    nationality: yup.string().nullable(),
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup
        .string()
        .trim()
        .min(2)
        .max(50)
        .required('Full name is required'),
    email: yup
        .string()
        .trim()
        .email('Invalid email format')
        .max(255)
        .nullable(),
    phone: yup.string().trim().max(255).nullable(),
    password: yup.string().trim().max(255).required('Password is required'),
});

module.exports = {
    BOOK_VALIDATION_SCHEMA,
    AUTHOR_VALIDATION_SCHEMA,
    CUSTOMER_VALIDATION_SCHEMA,
};
