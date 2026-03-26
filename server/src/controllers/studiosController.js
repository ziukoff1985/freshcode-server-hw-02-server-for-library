const db = require('../../db');

class StudiosController {
    async getAllStudios(req, res) {
        try {
            const studios = await db.query(
                `SELECT studios.id, studios.title, studios.logo, countries.description AS country, locations.city AS city
                FROM studios
                JOIN locations ON studios.locationid = locations.id
                JOIN countries ON locations.countryid = countries.id
                ORDER BY studios.id
                `,
            );
            res.status(200).json(studios.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getStudioById(req, res) {
        try {
            const { studioId } = req.params;
            const studio = await db.query(
                `
                SELECT studios.id, studios.title, studios.logo, countries.description AS country, locations.city AS city
                FROM studios
                JOIN locations ON studios.locationid = locations.id
                JOIN countries ON locations.countryid = countries.id
                WHERE studios.id=$1
                `,
                [studioId],
            );
            if (studio.rows.length === 0) {
                return res.status(404).send('Studio not found');
            }
            res.status(200).json(studio.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async createStudio(req, res) {
        try {
            const { title, logo, country, city } = req.body;
            const newStudio = await db.query(
                `
                INSERT INTO studios (title, logo, locationid)
                VALUES ($1, $2, (SELECT id FROM locations WHERE city=$3 AND countryid=(SELECT id FROM countries WHERE title=$4)))
                RETURNING *
                `,
                [title, logo, city, country],
            );
            res.status(201).json(newStudio.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateStudio(req, res) {
        try {
            const { id, title, logo, country, city } = req.body;
            const updatedStudio = await db.query(
                `
                UPDATE studios
                SET title=$2, logo=$3, locationid=
                (SELECT id FROM locations WHERE city=$4 AND countryid=(SELECT id FROM countries WHERE title=$5))
                WHERE id=$1
                RETURNING *
                `,
                [id, title, logo, city, country],
            );
            if (updatedStudio.rows.length === 0) {
                return res.status(404).send('Studio not found');
            }
            res.status(200).json(updatedStudio.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async deleteStudio(req, res) {
        try {
            const { studioId } = req.params;
            const deletedStudio = await db.query(
                `
                DELETE FROM studios
                WHERE id=$1
                RETURNING title, id
                `,
                [studioId],
            );
            if (deletedStudio.rows.length === 0) {
                return res.status(404).send('Studio not found');
            }
            res.status(200).json(deletedStudio.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new StudiosController();
