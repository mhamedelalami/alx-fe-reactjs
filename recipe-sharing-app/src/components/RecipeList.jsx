import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

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
          <Link to={`/recipes/${recipe.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
            {recipe.title}
          </Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
