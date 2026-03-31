const express = require('express');
// ----------------------------------
const router = require('./routers/index');
const errorHandlers = require('./middleware/errorHandlers');
// ----------------------------------
const app = express();

app.use(express.json());

app.use('/api', router);

const { validationErrorHandler, errorHandler } = errorHandlers;
app.use(validationErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('This is Library home page!');
});

module.exports = app;
