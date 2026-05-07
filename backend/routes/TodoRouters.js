const express = require("express");
const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  toggleDone,
  deleteTodo,
} = require("../controllers/TodoController");

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id/done", toggleDone);
router.delete("/todos/:id", deleteTodo);

module.exports = router;