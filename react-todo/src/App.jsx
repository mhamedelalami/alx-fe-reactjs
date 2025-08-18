// import React from "react";
// import TodoList from "./components/TodoList";

// function App() {
//   return (
//     <div>
//       <h1>My Todo App</h1>
//       <TodoList />
//     </div>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <TodoList />
      </div>
    </div>
  );
}

export default App;