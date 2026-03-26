const db = require('../../db');

class BooksControllers {
    async getAllBooks(req, res) {
        try {
            const books = await db.query(
                `
                SELECT books.id, books.title, books.description, books.image, genres.title AS genre
                FROM books
                JOIN genres ON books.genre_id = genres.id
                ORDER BY books.id
                `,
            );
            res.status(200).json(books.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getBookById(req, res) {
        try {
            const { bookId } = req.params;
            const book = await db.query(
                `
                SELECT books.id, books.title, books.description, books.image, genres.title AS genre
                FROM books
                JOIN genres ON books.genre_id = genres.id
                WHERE books.id=$1
                `,
                [bookId],
            );
            if (book.rows.length === 0) {
                return res.status(404).send('Book not found');
            }
            res.status(200).json(book.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async createBook(req, res) {
        try {
            const { title, genre, shelf, description, image } = req.body;
            const newBook = await db.query(
                `
                INSERT INTO books (title, genre_id, shelf_id, description, image)
                VALUES ($1, (SELECT id FROM genres WHERE title=$2), (SELECT id FROM shelves WHERE title=$3), $4, $5)
                RETURNING *
                `,
                [title, genre, shelf, description, image],
            );
            res.status(200).json(newBook.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateBook(req, res) {
        try {
            const { id, title, genre, shelf, description, image } = req.body;
            const updatedBook = await db.query(
                `
                UPDATE books
                SET 
                title=$2, 
                genre_id=(SELECT id FROM genres WHERE title=$3), shelf_id=(SELECT id FROM shelves WHERE title=$4), description=$5, 
                image=$6
                WHERE id=$1
                RETURNING *
                `,
                [id, title, genre, shelf, description, image],
            );
            if (updatedBook.rows.length === 0) {
                return res.status(404).send('Book not found');
            }
            res.status(200).json(updatedBook.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new BooksControllers();
