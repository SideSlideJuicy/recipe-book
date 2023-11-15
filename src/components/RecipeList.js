import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from './StarIcon';
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

  const renderStars = (rating) => {
    if (!rating || rating <= 0) {
      return null; // Handle unrated recipes
    }

    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="star" role="img" aria-label="star">
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-card">
            <Link to={`/recipe/${recipe._id}`} state={recipe}>
              <div className="image-container">
                <img src={`http://localhost:3001/uploads/${recipe.imageUrl}`} alt={recipe.title} />
              </div>
              <div className="recipe-details">
                <h3>{recipe.title}</h3>
                <p>Preparation Time: {recipe.preparationTime}</p>
                {recipe.rating && <div className="stars-container">{renderStars(recipe.rating)}</div>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
