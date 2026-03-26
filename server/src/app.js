const express = require('express');

const ActorsController = require('./controllers/actorsController');
const DirectorsController = require('./controllers/directorsController');
const MoviesController = require('./controllers/moviesController');
const StudiosController = require('./controllers/studiosController');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is the home page!');
});

app.get('/actors', ActorsController.getAllActors);
app.get('/actors/:actorId', ActorsController.getActorById);
app.post('/actors', ActorsController.createActor);
app.put('/actors', ActorsController.updateActor);
app.delete('/actors/:actorId', ActorsController.deleteActor);

app.get('/directors', DirectorsController.getAllDirectors);
app.get('/directors/:directorId', DirectorsController.getDirectorById);
app.post('/directors', DirectorsController.createDirector);
app.put('/directors', DirectorsController.updateDirector);
app.delete('/directors/:directorId', DirectorsController.deleteDirector);

app.get('/movies', MoviesController.getAllMovies);
app.get('/movies/:movieId', MoviesController.getMovieById);
app.post('/movies', MoviesController.createMovie);
app.put('/movies', MoviesController.updateMovie);
app.delete('/movies/:movieId', MoviesController.deleteMovie);

app.get('/studios', StudiosController.getAllStudios);
app.get('/studios/:studioId', StudiosController.getStudioById);
app.post('/studios', StudiosController.createStudio);
app.put('/studios', StudiosController.updateStudio);
app.delete('/studios/:studioId', StudiosController.deleteStudio);

module.exports = app;
