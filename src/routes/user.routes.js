const { Router } = require("express");

const userRouter = Router();

const UserController = require("../controllers/UserController");

const usersController = UserController();

userRouter.post("/",usersController.create );

module.exports = userRouter;