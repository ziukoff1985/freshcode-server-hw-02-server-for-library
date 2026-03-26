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

    async createAuthor(req, res) {
        try {
            const { full_name, email, nationality } = req.body;
            const newAuthor = await db.query(
                `
                INSERT INTO authors (full_name, email, nationality_id)
                VALUES ($1, $2, (SELECT id FROM nationalities WHERE title=$3))
                RETURNING *
                `,
                [full_name, email, nationality],
            );
            res.status(200).json(newAuthor.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateAuthor(req, res) {
        try {
            const { id, full_name, email, nationality } = req.body;
            const updatedActor = await db.query(
                `
            UPDATE authors
            SET
            full_name=$2,
            email=$3,
            nationality_id=(SELECT id FROM nationalities WHERE title=$4)
            WHERE id=$1
            RETURNING *
            `,
                [id, full_name, email, nationality],
            );
            if (updatedActor.rows.length === 0) {
                return res.status(404).send('Author not found');
            }
            res.status(200).json(updatedActor.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new AuthorsController();
