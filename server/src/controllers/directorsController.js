const db = require('../../db');

class DirectorsController {
    async getAllDirectors(req, res) {
        try {
            const directors = await db.query(
                `SELECT directors.id, directors.full_name, directors.birth_year, directors.death_year, directors.photo, countries.description AS country
                FROM directors
                JOIN countries ON directors.countryid = countries.id
                ORDER BY directors.id
                `,
            );
            res.status(200).json(directors.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getDirectorById(req, res) {
        try {
            const { directorId } = req.params;
            const director = await db.query(
                `
                SELECT directors.id, directors.full_name, directors.birth_year, directors.death_year, directors.photo, countries.description AS country
                FROM directors
                JOIN countries ON directors.countryid = countries.id
                WHERE directors.id=$1
                `,
                [directorId],
            );
            if (director.rows.length === 0) {
                return res.status(404).send('Director not found');
            }
            res.status(200).json(director.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async createDirector(req, res) {
        try {
            const { full_name, birth_year, death_year, photo, country } =
                req.body;
            const newDirector = await db.query(
                `
                INSERT INTO directors (full_name, birth_year, death_year, photo, countryid)
                VALUES ($1, $2, $3, $4, (SELECT id FROM countries WHERE title=$5))
                RETURNING *
                `,
                [full_name, birth_year, death_year, photo, country],
            );
            res.status(201).json(newDirector.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateDirector(req, res) {
        try {
            const { id, full_name, birth_year, death_year, photo, country } =
                req.body;
            const updatedDirector = await db.query(
                `
                UPDATE directors
                SET full_name=$2, birth_year=$3, death_year=$4, photo=$5, countryid=
                (SELECT id FROM countries WHERE title=$6)
                WHERE id=$1
                RETURNING *
                `,
                [id, full_name, birth_year, death_year, photo, country],
            );
            if (updatedDirector.rows.length === 0) {
                return res.status(404).send('Director not found');
            }
            res.status(200).json(updatedDirector.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async deleteDirector(req, res) {
        try {
            const { directorId } = req.params;
            const deletedDirector = await db.query(
                `
                DELETE FROM directors
                WHERE id=$1
                RETURNING full_name, id
                `,
                [directorId],
            );
            if (deletedDirector.rows.length === 0) {
                return res.status(404).send('Director not found');
            }
            res.status(200).json(deletedDirector.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new DirectorsController();
