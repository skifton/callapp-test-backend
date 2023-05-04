const express = require("express");
const User = require("../controllers/user.controller");
const usersRouter = express.Router();

usersRouter.get("/users/:id", User.getUser);
usersRouter.get("/users", User.getUserList);
usersRouter.post("/users", User.createUser);
usersRouter.put("/users/:id", User.updateUser);
usersRouter.delete("/users/:id", User.removeUser);

module.exports = usersRouter;
