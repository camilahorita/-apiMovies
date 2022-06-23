const { Router } = require("express");

const usersRoutes = require("./user.routes")
const moviesRoutes = require("./movies.routes")

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);

module.exports = routes;