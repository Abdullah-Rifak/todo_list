import { useState } from "react";
import API from "../services/api";

function TodoItem({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  // TOGGLE DONE
  const toggleDone = async () => {
    try {
      await API.patch(`/todos/${todo._id}/done`);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TODO
  const deleteTodo = async () => {
    try {
      await API.delete(`/todos/${todo._id}`);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE TODO
  const updateTodo = async () => {
    try {
      await API.put(`/todos/${todo._id}`, {
        title,
        description,
      });

      setIsEditing(false);

      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`todo-card ${todo.done ? "done" : ""}`}>

      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={updateTodo}>
            Save
          </button>

          <button onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>

          <p>{todo.description}</p>

          <button onClick={toggleDone}>
            {todo.done ? "Undo" : "Done"}
          </button>

          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button onClick={deleteTodo}>
            Delete
          </button>
        </>
      )}

    </div>
  );
}

export default TodoItem;