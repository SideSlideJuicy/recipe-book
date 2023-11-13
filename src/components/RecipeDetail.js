import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './RecipeDetail.css'; // Import styles

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const recipe = location.state;

  console.log('ID from URL:', id);
  console.log('Current Recipe:', recipe);

  if (!recipe || recipe._id !== id) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-title">{recipe.title}</h2>
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      <div className="recipe-section">
        <h3>Ingredients</h3>
        <p className="recipe-content">{recipe.ingredients}</p>
      </div>
      <div className="recipe-section">
        <h3>Instructions</h3>
        <p className="recipe-content">{recipe.instructions}</p>
      </div>
      {/* You can add more sections for additional details */}
      <Link to="/" className="back-link">Back to Recipe List</Link>
    </div>
  );
};

export default RecipeDetail;
