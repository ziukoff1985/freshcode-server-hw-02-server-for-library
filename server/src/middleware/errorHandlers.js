const { ValidationError } = require('yup');
// ----------------------------------

const validationErrorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        return res.status(400).send({
            errors: [{ title: 'Validation error', detail: error.errors }],
        });
    }
    next(error);
};

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return;
    }

    if (error.code === '23505') {
        return res.status(409).send({
            errors: [
                {
                    title: 'Duplicate error',
                    detail: error.detail,
                },
            ],
        });
    }

    res.status(error?.status ?? 500).send({
        errors: [
            {
                title: error?.message ?? 'Internal server error',
            },
        ],
    });
};

module.exports = {
    validationErrorHandler,
    errorHandler,
};
