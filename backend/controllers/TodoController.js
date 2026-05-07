const Todo = require("../models/Todo");

// GET all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// CREATE todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({ title, description });
    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

// UPDATE todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

// TOGGLE done
exports.toggleDone = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    todo.done = !todo.done;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle todo" });
  }
};

// DELETE todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};