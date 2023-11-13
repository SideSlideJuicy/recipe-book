import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [addingRecipe, setAddingRecipe] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleAddButtonClick = () => {
    console.log("Adding recipe button clicked");
    setAddingRecipe(true);
    console.log("Adding recipe state:", !addingRecipe);
  };
  
  const handleCancelAddRecipe = () => {
    console.log("Cancel button clicked");
    setAddingRecipe(false);
  };

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, { ...newRecipe, id: Date.now() }]);
    setAddingRecipe(false);
  };
  

  useEffect(() => {
    setAddingRecipe(false);
  }, []);

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Recipe Book</h1>
          <button className="add-button" onClick={handleAddButtonClick}>Add Recipe</button>
        </header>

        {addingRecipe ? (
          <div className='add-view'>
            <AddRecipe onCancel={handleCancelAddRecipe} onAdd={handleAddRecipe} />
          </div>
        ) : (
          <div className='main-view'>
            <nav>
              <ul>
                <li>
                  <Link to="/">All Recipes</Link>
                </li>
                <li className='dropdown' onMouseEnter={toggleCategoryDropdown} onMouseLeave={toggleCategoryDropdown}>
                  <span>Categories</span>
                  {showCategoryDropdown && (
                    <ul>
                      <li>
                        <Link to="/categories/main">Main</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Dessert</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<RecipeList recipes={recipes} />} />
              <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
