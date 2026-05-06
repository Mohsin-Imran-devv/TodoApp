const express = require("express");
const todoItemsController = require("../controllers/todoItemsController");
const todoItemsRouter = express.Router();


todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.get("/", todoItemsController.getTodoItems);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id/completed", todoItemsController.markCompleted);
module.exports = todoItemsRouter;
