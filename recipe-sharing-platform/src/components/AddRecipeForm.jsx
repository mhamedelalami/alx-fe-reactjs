import React, { useState } from 'react';

export default function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    } else {
      const items = ingredients.split(',').map(i => i.trim()).filter(i => i);
      if (items.length < 2) newErrors.ingredients = 'Please enter at least two ingredients.';
    }
    if (!preparation.trim()) newErrors.preparation = 'Preparation steps are required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Proceed with submission logic (to be implemented)
    alert('Form submitted successfully!');
    setTitle('');
    setIngredients('');
    setPreparation('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-1">Recipe Title</label>
        <input
          type="text"
          id="title"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.title ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-600 mt-1 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="ingredients" className="block font-semibold mb-1">Ingredients</label>
        <textarea
          id="ingredients"
          rows="4"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.ingredients ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
          }`}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="List ingredients separated by commas"
        />
        {errors.ingredients && <p className="text-red-600 mt-1 text-sm">{errors.ingredients}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="preparation" className="block font-semibold mb-1">Preparation Steps</label>
        <textarea
          id="preparation"
          rows="4"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.preparation ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
          }`}
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
          placeholder="Describe preparation steps"
        />
        {errors.preparation && <p className="text-red-600 mt-1 text-sm">{errors.preparation}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
}
