import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import Snackbar from './components/Snackbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Manager</h1>
      <AddRecipeForm />
      <RecipeList />
      <Snackbar />
    </div>
  );
}

export default App;
