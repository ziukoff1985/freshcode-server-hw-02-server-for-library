const db = require('../../db');

class MoviesController {
    async getAllMovies(req, res) {
        try {
            const movies = await db.query(
                `
                SELECT movies.id, movies.title, movies.year, movies.poster, genres.title AS genre, studios.title AS studio
                FROM movies
                JOIN genres ON movies.genreid = genres.id
                JOIN studios ON movies.studioid = studios.id
                ORDER BY movies.id
                `,
            );
            res.status(200).json(movies.rows);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getMovieById(req, res) {
        try {
            const { movieId } = req.params;
            const movie = await db.query(
                `
                SELECT movies.id, movies.title, movies.year, movies.poster, genres.title AS genre, studios.title AS studio 
                FROM movies
                JOIN genres ON movies.genreid = genres.id
                JOIN studios ON movies.studioid = studios.id
                WHERE movies.id=$1
                `,
                [movieId],
            );
            if (movie.rows.length === 0) {
                return res.status(404).send('Movie not found');
            }
            res.status(200).json(movie.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async createMovie(req, res) {
        try {
            const { title, year, poster, genre, studio } = req.body;
            const newMovie = await db.query(
                `
                INSERT INTO movies (title, year, poster, genreid, studioid)
                VALUES ($1, $2, $3, (SELECT id FROM genres WHERE title=$4), (SELECT id FROM studios WHERE title=$5))
                RETURNING *
                `,
                [title, year, poster, genre, studio],
            );
            res.status(201).json(newMovie.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateMovie(req, res) {
        try {
            const { id, title, year, poster, genre, studio } = req.body;
            const updatedMovie = await db.query(
                `
                UPDATE movies
                SET title=$2, year=$3, poster=$4, genreid=
                (SELECT id FROM genres WHERE title=$5), studioid=
                (SELECT id FROM studios WHERE title=$6)
                WHERE id=$1
                RETURNING *
                `,
                [id, title, year, poster, genre, studio],
            );
            if (updatedMovie.rows.length === 0) {
                return res.status(404).send('Movie not found');
            }
            res.status(200).json(updatedMovie.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async deleteMovie(req, res) {
        try {
            const { movieId } = req.params;
            const deletedMovie = await db.query(
                `
                DELETE FROM movies
                WHERE id=$1
                RETURNING title, id
                `,
                [movieId],
            );
            if (deletedMovie.rows.length === 0) {
                return res.status(404).send('Movie not found');
            }
            res.status(200).json(deletedMovie.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = new MoviesController();
