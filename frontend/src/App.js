import { useEffect, useState } from "react";
import API from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH TODOS
  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>TODO App</h1>

      <TodoForm fetchTodos={fetchTodos} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      )}
    </div>
  );
}

export default App;