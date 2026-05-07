import { useCallback, useEffect, useState } from "react";
import API from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getErrorMessage = (err, fallbackMessage) =>
    err?.response?.data?.message || err?.message || fallbackMessage;

  // FETCH TODOS
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load TODOs."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="app">
      <h1>TODO App</h1>

      {error ? (
        <div className="message error-message" role="alert">
          <span>{error}</span>

          <button type="button" onClick={fetchTodos}>
            Retry
          </button>
        </div>
      ) : null}

      <TodoForm fetchTodos={fetchTodos} />

      {loading ? (
        <p className="message status-message">Loading TODOs...</p>
      ) : todos.length > 0 ? (
        <div className="two-column-view">
          <div className="column">
            <h2 className="column-title pending-title">⧖ Pending</h2>
            <TodoList
              todos={todos.filter((t) => !t.done)}
              fetchTodos={fetchTodos}
            />
            {todos.filter((t) => !t.done).length === 0 && (
              <p className="column-empty">All tasks completed!</p>
            )}
          </div>

          <div className="column">
            <h2 className="column-title done-title">✓ Completed</h2>
            <TodoList
              todos={todos.filter((t) => t.done)}
              fetchTodos={fetchTodos}
            />
            {todos.filter((t) => t.done).length === 0 && (
              <p className="column-empty">No completed tasks yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="message status-message">No TODOs yet. Add your first task above.</p>
      )}
    </div>
  );
}

export default App;