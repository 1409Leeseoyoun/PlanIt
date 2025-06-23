import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get("/api/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios
      .post("/api/todos", {
        title: newTodo,
        due_date: new Date().toISOString().split("T")[0], // 오늘 날짜
      })
      .then(() => {
        setNewTodo("");
        axios.get("/api/todos").then((res) => setTodos(res.data));
      });
  };

  return (
    <div>
      <h1>D-Day ToDo</h1>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.due_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
