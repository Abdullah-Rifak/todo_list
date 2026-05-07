const Todo = require("../models/Todo");

const isValidObjectId = (id) => Todo.db.base.Types.ObjectId.isValid(id);

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

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

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: "Title cannot be empty" });
      }

      todo.title = title.trim();
    }

    if (description !== undefined) {
      todo.description = description;
    }

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

exports.toggleDone = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid todo id" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};