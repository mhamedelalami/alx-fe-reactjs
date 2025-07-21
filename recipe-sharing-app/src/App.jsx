import React from 'react';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>
      
      <section>
        <h2>All Recipes</h2>
        <RecipeList />
      </section>

      <section>
        <FavoritesList />
      </section>

      <section>
        <RecommendationsList />
      </section>
    </div>
  );
}

export default App;
