import { useState } from "react";
import API from "../services/api";

function TodoItem({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      setShowDeleteConfirm(false);
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

      {showDeleteConfirm ? (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this TODO?</p>
          <div className="confirmation-buttons">
            <button
              className="btn-danger"
              onClick={deleteTodo}
              disabled={saving}
            >
              {saving ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
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

          <div className="button-group">
            <button className="btn-save" onClick={updateTodo} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              className="btn-cancel"
              onClick={() => {
                setError("");
                setIsEditing(false);
              }}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>

          <p>{todo.description}</p>

          <div className="button-group">
            <button
              className="btn-done"
              onClick={toggleDone}
              disabled={saving}
            >
              {todo.done ? "↻ Undo" : "✓ Done"}
            </button>

            <button
              className="btn-edit"
              onClick={() => {
                setError("");
                setIsEditing(true);
              }}
              disabled={saving}
            >
              ✎ Edit
            </button>

            <button
              className="btn-delete"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={saving}
            >
              ✕ Delete
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default TodoItem;