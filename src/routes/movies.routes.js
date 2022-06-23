const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController")

const movieNotesController = new MovieNotesController();

const moviesRoutes = Router();

moviesRoutes.post("/", movieNotesController.create);
moviesRoutes.delete("/:id", movieNotesController.delete);
moviesRoutes.get("/:id", movieNotesController.show);


module.exports = moviesRoutes;

