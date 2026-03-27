const express = require('express');
// ----------------------------------
const router = require('./routers/index');

// const BooksControllers = require('./controllers/booksController');
// const CustomersController = require('./controllers/customersController');
// ----------------------------------
const app = express();
app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    res.send('This is Library home page!');
});

// app.get('/books', BooksControllers.getAllBooks);
// app.get('/books/:bookId', BooksControllers.getBookById);
// app.post('/books', BooksControllers.createBook);
// app.put('/books', BooksControllers.updateBook);
// app.delete('/books/:bookId', BooksControllers.deleteBook);

// app.get('/authors', AuthorsController.getAllAuthors);
// app.get('/authors/:authorId', AuthorsController.getAuthorById);
// app.post('/authors', AuthorsController.createAuthor);
// app.put('/authors', AuthorsController.updateAuthor);
// app.delete('/authors/:authorId', AuthorsController.deleteAuthor);

// app.get('/customers', CustomersController.getAllCustomers);
// app.get('/customers/:customerId', CustomersController.getCustomerById);
// app.post('/customers', CustomersController.createCustomer);
// app.put('/customers', CustomersController.updateCustomer);
// app.delete('/customers/:customerId', CustomersController.deleteCustomer);

module.exports = app;
