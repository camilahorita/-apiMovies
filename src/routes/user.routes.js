const { Router } = require("express");

const userRouter = Router();

const UserController = require("../controllers/UserController");

const usersController = new UserController();
     
userRouter.post("/", usersController.create);
userRouter.put("/:id", usersController.update);

module.exports = userRouter;