const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController")

const movieNotesController = new MovieNotesController();

const moviesRoutes = Router();

moviesRoutes.use("/", movieNotesController.create);

module.exports = moviesRoutes;