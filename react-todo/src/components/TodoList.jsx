import React, { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState(["Learn React", "Build a Todo App"]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index] = newTodos[index].startsWith("✔️")
      ? newTodos[index].slice(2)
      : "✔️" + newTodos[index];
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        placeholder="Add a new todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => toggleTodo(index)}
            style={{
              textDecoration: todo.startsWith("✔️") ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.replace("✔️", "")}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(index);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
