import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [title, setTitle] = useState('All Recipes');
  const { type, cuisine, rating } = useParams();

  useEffect(() => {
    // Fetch all recipes
    fetchRecipes();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    // Filter recipes based on type, cuisine, or rating
    let filtered = recipes;

    if (type) {
        filtered = filtered.filter((recipe) => recipe.type === type);
        setTitle(`${type.charAt(0).toUpperCase() + type.slice(1)} recipes`); // Capitalize the first letter
      } else if (cuisine) {
        filtered = filtered.filter((recipe) => recipe.cuisine === cuisine);
        setTitle(`${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} recipes`); // Capitalize the first letter
      } else if (rating) {
        filtered = filtered.filter((recipe) => recipe.rating === parseInt(rating));
        setTitle(`${rating} recipes`);
      } else {
        setTitle('All Recipes');
      }

    setFilteredRecipes(filtered);
  }, [recipes, type, cuisine, rating]);

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

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes'); // Adjust the API endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error('Error fetching recipes:', response.status);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="recipe-list">
      <h2>{title}</h2>
      <ul>
        {filteredRecipes.map((recipe, index) => (
            <li key={`${recipe._id}-${index}`} className="recipe-card">
            <Link to={`/recipe/${recipe._id}`} state={recipe} onClick={() => console.log('Recipe ID:', recipe._id)}>
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
