import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Recipe Sharing App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <RecipeList />
            </>
          } />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
