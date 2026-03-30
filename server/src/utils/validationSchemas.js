const yup = require('yup');

const BOOK_VALIDATION_SCHEMA = yup.object().shape({
    title: yup.string().required('Book title is required'),
    genre: yup.string().required('Book genre is required'),
    shelf: yup.string().required('Book shelf is required'),
    description: yup.string(),
    image: yup.string(),
});

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email format').required(),
    nationality: yup.string(),
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email format').required(),
    phone: yup.string(),
    password: yup.string().required('Password is required'),
});

module.exports = {
    BOOK_VALIDATION_SCHEMA,
    AUTHOR_VALIDATION_SCHEMA,
    CUSTOMER_VALIDATION_SCHEMA,
};
