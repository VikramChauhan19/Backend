//route create karenge
const express = require("express");
const router = express.Router();
//A Router in Express is like a mini-application or sub-app that handles a specific group of routes.
//It helps organize your code and keep your index.js clean.

//import controller
const { createTodo } = require("../controllers/createTodo");
const { getTodos, getTodoById } = require("../controllers/getTodos");

//define api routes
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.get("/getTodos/:id", getTodoById);

module.exports = router;
