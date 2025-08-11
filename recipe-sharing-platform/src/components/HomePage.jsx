import React, { useState, useEffect } from 'react';
import recipeData from '../data.json';
import { Link } from 'react-router-dom';


export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recipe Sharing Platform</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map(({ id, title, summary, image }) => (
  <Link
    to={`/recipe/${id}`}
    key={id}
    className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-40 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{summary}</p>
    </div>
  </Link>
))}
      </div>
    </div>
  );
}
