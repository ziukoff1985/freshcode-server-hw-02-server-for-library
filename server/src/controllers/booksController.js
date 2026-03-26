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
}

module.exports = new BooksControllers();
