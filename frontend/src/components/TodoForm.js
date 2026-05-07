import { useState } from "react";
import API from "../services/api";

function TodoForm({ fetchTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const getErrorMessage = (err, fallbackMessage) =>
    err?.response?.data?.message || err?.message || fallbackMessage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setSubmitting(true);

    try {
      await API.post("/todos", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTodos();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create TODO."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <p className="message error-message" role="alert">
          {error}
        </p>
      ) : null}

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={submitting}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;