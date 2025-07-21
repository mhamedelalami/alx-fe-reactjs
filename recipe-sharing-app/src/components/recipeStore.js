import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],

  // Search term for filtering
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

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
      favorites: state.favorites.filter((id) => id !== recipeId), // Remove from favorites if deleted
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
      // Recommend recipes not in favorites sharing first letter with any favorite
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
