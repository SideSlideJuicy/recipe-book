import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          setRecipes(data);
        } else {
          console.error('Failed to fetch recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id} className="recipe-card">
            {/* Pass individual recipe to the state */}
            <Link to={`/recipe/${recipe._id}`} state={recipe}>
            <div className="image-container">
                <img src={`http://localhost:3001/uploads/${recipe.imageUrl}`} alt={recipe.title} />
            </div>
            <div className="recipe-details">
                <h3>{recipe.title}</h3>
            </div>
            </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;