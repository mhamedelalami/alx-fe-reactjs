import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
      favorites: state.favorites.filter((id) => id !== recipeId), // Also remove from favorites if deleted
    })),

  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  recommendations: [],

  generateRecommendations: () =>
    set((state) => {
      // Simple mock: recommend recipes that are NOT in favorites but share the same first letter as any favorite recipe
      const favoriteRecipes = state.recipes.filter((r) =>
        state.favorites.includes(r.id)
      );

      if (favoriteRecipes.length === 0) return { recommendations: [] };

      const recommended = state.recipes.filter(
        (recipe) =>
          !state.favorites.includes(recipe.id) &&
          favoriteRecipes.some(
            (fav) => fav.title[0].toLowerCase() === recipe.title[0].toLowerCase()
          )
      );

      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
