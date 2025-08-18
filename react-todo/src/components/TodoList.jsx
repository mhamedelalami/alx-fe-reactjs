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
import { Trash2, Plus, Check, X } from 'lucide-react';

// AddTodoForm Component
const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="todo-input"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          data-testid="add-button"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

// TodoItem Component
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
        todo.completed
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-gray-300 hover:border-gray-400'
      }`}
      data-testid="todo-item"
    >
      <div
        className="flex items-center gap-3 flex-1 cursor-pointer"
        onClick={() => onToggle(todo.id)}
        data-testid="todo-toggle"
      >
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {todo.completed && <Check size={12} className="text-white" />}
        </div>
        <span
          className={`transition-all duration-200 ${
            todo.completed
              ? 'text-gray-500 line-through'
              : 'text-gray-800'
          }`}
          data-testid="todo-text"
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        data-testid="delete-button"
        aria-label={`Delete todo: ${todo.text}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

// Main TodoList Component
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
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2" data-testid="app-title">
          Todo List
        </h1>
        <p className="text-gray-600" data-testid="todo-stats">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>

      <AddTodoForm onAddTodo={addTodo} />

      <div className="space-y-3" data-testid="todo-list">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500" data-testid="empty-message">
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
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span data-testid="remaining-count">
              {todos.filter(todo => !todo.completed).length} remaining
            </span>
            <span data-testid="completed-count">
              {completedCount} completed
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <TodoList />
    </div>
  );
};

export default App;