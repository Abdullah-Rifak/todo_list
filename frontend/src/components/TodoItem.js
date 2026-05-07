import { useState } from "react";
import API from "../services/api";

function TodoItem({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const getErrorMessage = (err, fallbackMessage) =>
    err?.response?.data?.message || err?.message || fallbackMessage;

  // TOGGLE DONE
  const toggleDone = async () => {
    setError("");
    setSaving(true);

    try {
      await API.patch(`/todos/${todo._id}/done`);
      fetchTodos();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update TODO status."));
    } finally {
      setSaving(false);
    }
  };

  // DELETE TODO
  const deleteTodo = async () => {
    setError("");
    setSaving(true);

    try {
      await API.delete(`/todos/${todo._id}`);
      fetchTodos();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete TODO."));
    } finally {
      setSaving(false);
    }
  };

  // UPDATE TODO
  const updateTodo = async () => {
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setSaving(true);

    try {
      await API.put(`/todos/${todo._id}`, {
        title,
        description,
      });

      setIsEditing(false);

      fetchTodos();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update TODO."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`todo-card ${todo.done ? "done" : ""}`}>
      {error ? (
        <p className="message error-message" role="alert">
          {error}
        </p>
      ) : null}

      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={saving}
          />

          <button onClick={updateTodo} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => {
              setError("");
              setIsEditing(false);
            }}
            disabled={saving}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>

          <p>{todo.description}</p>

          <button onClick={toggleDone} disabled={saving}>
            {todo.done ? "Undo" : "Done"}
          </button>

          <button
            onClick={() => {
              setError("");
              setIsEditing(true);
            }}
            disabled={saving}
          >
            Edit
          </button>

          <button onClick={deleteTodo} disabled={saving}>
            {saving ? "Working..." : "Delete"}
          </button>
        </>
      )}

    </div>
  );
}

export default TodoItem;