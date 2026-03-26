const db = require('../../db');

class AuthorsController {
    async getAllAuthors(req, res) {
        try {
            const authors = await db.query(
                `
                SELECT authors.id, authors.full_name, authors.email, nationalities.title AS nationality
                FROM authors
                JOIN nationalities ON authors.nationality_id = nationalities.id
                ORDER BY authors.id
                `,
            );
            res.status(200).json(authors.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getAuthorById(req, res) {
        try {
            const { authorId } = req.params;
            const author = await db.query(
                `
                SELECT authors.id, authors.full_name, authors.email, nationalities.title AS nationality
                FROM authors
                JOIN nationalities ON authors.nationality_id = nationalities.id
                WHERE authors.id=$1
                `,
                [authorId],
            );
            if (author.rows.length === 0) {
                return res.status(404).send('Author not found');
            }
            res.status(200).json(author.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new AuthorsController();
