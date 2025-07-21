import React, { useMemo } from 'react';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favoritesIds = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);

  // Memoize mapping to avoid infinite re-render
  const favoriteRecipes = useMemo(() => {
    return favoritesIds.map(id => recipes.find(recipe => recipe.id === id));
  }, [favoritesIds, recipes]);

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
