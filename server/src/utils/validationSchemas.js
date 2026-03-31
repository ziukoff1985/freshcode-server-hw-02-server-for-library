const yup = require('yup');
// ----------------------------------
const BOOK_VALIDATION_SCHEMA = yup.object().shape({
    title: yup.string().required('Book title is required'),
    genre: yup.string().required('Book genre is required'),
    shelf: yup.string().required('Book shelf is required'),
    description: yup.string().nullable(),
    image: yup.string().nullable(),
});

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup
        .string()
        .trim()
        .min(2)
        .max(30)
        .required('Full name is required'),
    email: yup.string().email('Invalid email format').required(),
    nationality: yup.string().nullable(),
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup
        .string()
        .trim()
        .min(2)
        .max(30)
        .required('Full name is required'),
    email: yup.string().email('Invalid email format').nullable(),
    phone: yup.string().nullable(),
    password: yup.string().required('Password is required'),
});

module.exports = {
    BOOK_VALIDATION_SCHEMA,
    AUTHOR_VALIDATION_SCHEMA,
    CUSTOMER_VALIDATION_SCHEMA,
};
