import React from 'react';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  // If there is no search term or filteredRecipes is empty, show all recipes
  const displayedRecipes =
    searchTerm.trim() === '' || filteredRecipes.length === 0
      ? recipes
      : filteredRecipes;

  if (displayedRecipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      {displayedRecipes.map((recipe) => (
        <div key={recipe.id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
