// import React, { useState } from 'react';

// function TodoList() {
//   const [todos, setTodos] = useState([
//     { id: 1, text: 'Learn React', completed: false },
//     { id: 2, text: 'Build a project', completed: false },
//     { id: 3, text: 'Deploy the project', completed: true },
//   ]);

//   const [inputValue, setInputValue] = useState('');

//   const addTodo = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;
//     const newTodo = { id: Date.now(), text: inputValue, completed: false };
//     setTodos([...todos, newTodo]);
//     setInputValue('');
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map(todo =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       {/* We add a test ID to the form itself */}
//       <form onSubmit={addTodo} data-testid="add-todo-form">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Add a new todo"
//           // And a test ID to the input
//           data-testid="todo-input"
//         />
//         <button type="submit" data-testid="add-button">Add Todo</button>
//       </form>

//       <ul>
//         {todos.map(todo => (
//           // A dynamic test ID for each list item
//           <li
//             key={todo.id}
//             data-testid={`todo-item-${todo.id}`}
//             style={{
//               textDecoration: todo.completed ? 'line-through' : 'none',
//             }}
//           >
//             <span
//               onClick={() => toggleTodo(todo.id)}
//               // A test ID for the clickable text area
//               data-testid={`todo-text-${todo.id}`}
//               style={{ cursor: 'pointer' }}
//             >
//               {todo.text}
//             </span>
//             <button
//               onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
//               style={{ marginLeft: '10px' }}
//               // A test ID for the delete button
//               data-testid={`delete-button-${todo.id}`}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;


import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write unit tests', completed: false },
    { id: 3, text: 'Build a todo app', completed: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list" data-testid="todo-list-container">
      <h1 data-testid="app-title">Todo List</h1>
      <p data-testid="todo-stats">
        {completedCount} of {totalCount} tasks completed
      </p>

      <AddTodoForm onAddTodo={addTodo} />

      <div data-testid="todo-list">
        {todos.length === 0 ? (
          <div data-testid="empty-message">
            No todos yet. Add one above!
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="todo-stats">
          <span data-testid="remaining-count">
            {todos.filter(todo => !todo.completed).length} remaining
          </span>
          <span data-testid="completed-count">
            {completedCount} completed
          </span>
        </div>
      )}
    </div>
  );
};

export default TodoList;