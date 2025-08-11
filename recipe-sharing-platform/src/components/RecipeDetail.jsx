import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipesData from '../data.json';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = recipesData.find((r) => r.id === Number(id));
    setRecipe(found);
  }, [id]);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <p className="text-center text-gray-500">Recipe not found.</p>
        <Link to="/" className="text-blue-600 underline">Go back to Home</Link>
      </div>
    );
  }

  // Sample ingredients and steps, add these fields to your data.json next step
  const ingredients = recipe.ingredients || [
    'Ingredient 1',
    'Ingredient 2',
    'Ingredient 3',
  ];
  const steps = recipe.steps || [
    'Step 1: Do this',
    'Step 2: Do that',
    'Step 3: Finish up',
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/" className="text-blue-600 underline mb-6 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700">
          {ingredients.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Cooking Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
