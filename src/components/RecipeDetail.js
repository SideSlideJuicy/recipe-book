import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import StarIcon from './StarIcon';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const recipe = location.state;

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

  console.log('ID from URL:', id);
  console.log('Current Recipe:', recipe);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Recipe deleted successfully');
        // Redirect to the recipe list after deletion
        navigate('/');
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!recipe || recipe._id !== id) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-detail-container">
        <div className='title-group'>
            <h2 className="recipe-title">{recipe.title}</h2>
            {recipe.rating && <div className="stars-container">{renderStars(recipe.rating)}</div>}
        </div>
      
        <h3 className='type'>Type: {recipe.type}</h3>
        <h3 className='cuisine'>Cuisine: {recipe.cuisine}</h3>
        <h3 className='servings'>Servings: {recipe.servings}</h3>
        <img src={`http://localhost:3001/uploads/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image" />
        <div className="recipe-section">
            <h3>Ingredients</h3>
            <p className="recipe-content">{recipe.ingredients}</p>
        </div>
        <div className="recipe-section">
            <h3>Instructions</h3>
            <p className="recipe-content">{recipe.instructions}</p>
        </div>
        <div className="recipe-section">
            <p>Preparation Time: {recipe.preparationTime}</p>
        </div>
        {/* Delete button */}
        <button onClick={handleDelete} className="delete-button">
            Delete Recipe
        </button>
        <Link to="/" className="back-link">
            Back to Recipe List
        </Link>
    </div>
  );
};

export default RecipeDetail;
