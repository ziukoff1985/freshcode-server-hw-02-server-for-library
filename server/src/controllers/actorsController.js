const db = require('../../db');

class ActorsController {
    async getAllActors(req, res) {
        try {
            const actors = await db.query(
                `SELECT actors.id, actors.full_name, actors.birth_year, actors.death_year, actors.photo, countries.description AS country
                FROM actors
                JOIN countries ON actors.countryid = countries.id
                ORDER BY actors.id
                `,
            );
            res.status(200).json(actors.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getActorById(req, res) {
        try {
            const { actorId } = req.params;
            const actor = await db.query(
                `
                SELECT actors.id, actors.full_name, actors.birth_year, actors.death_year, actors.photo, countries.description AS country
                FROM actors
                JOIN countries ON actors.countryid = countries.id
                WHERE actors.id=$1
                `,
                [actorId],
            );
            if (actor.rows.length === 0) {
                return res.status(404).send('Actor not found');
            }
            res.status(200).json(actor.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async createActor(req, res) {
        try {
            const { full_name, birth_year, death_year, photo, country } =
                req.body;
            const newActor = await db.query(
                `
                INSERT INTO actors (full_name, birth_year, death_year, photo, countryid)
                VALUES ($1, $2, $3, $4, (SELECT id FROM countries WHERE title=$5))
                RETURNING *
                `,
                [full_name, birth_year, death_year, photo, country],
            );
            res.status(201).json(newActor.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateActor(req, res) {
        try {
            const { id, full_name, birth_year, death_year, photo, country } =
                req.body;
            const updatedActor = await db.query(
                `
                UPDATE actors
                SET full_name=$2, birth_year=$3, death_year=$4, photo=$5, countryid=
                (SELECT id FROM countries WHERE title=$6)
                WHERE id=$1
                RETURNING *
                `,
                [id, full_name, birth_year, death_year, photo, country],
            );
            if (updatedActor.rows.length === 0) {
                return res.status(404).send('Actor not found');
            }
            res.status(200).json(updatedActor.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async deleteActor(req, res) {
        try {
            const { actorId } = req.params;
            const deletedActor = await db.query(
                `
                DELETE FROM actors
                WHERE id=$1
                RETURNING full_name, id
                `,
                [actorId],
            );
            if (deletedActor.rows.length === 0) {
                return res.status(404).send('Actor not found');
            }
            res.status(200).json(deletedActor.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new ActorsController();
