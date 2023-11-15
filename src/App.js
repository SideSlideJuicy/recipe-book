import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import PlusIcon from './PlusIcon.jsx';
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
          <h1 className='app-title'>Recipe Book</h1>
          <button className="add-recipe" onClick={handleAddButtonClick}>
            {/* <PlusIcon className="plus-icon" /> */}
            New Recipe
          </button>
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
                  <span>Type</span>
                  {showCategoryDropdown && (
                    <ul>
                      <li>
                        <Link to="/categories/main">Breakfast</Link>
                      </li>
                      <li>
                        <Link to="/categories/main">Lunch</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Dinner</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Snack</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Appetizer (Starter)</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Main Course (Entrée)</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Side Dish</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Dessert</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Supper</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className='dropdown' onMouseEnter={toggleCategoryDropdown} onMouseLeave={toggleCategoryDropdown}>
                  <span>Cuisine</span>
                  {showCategoryDropdown && (
                    <ul>
                      <li>
                        <Link to="/categories/main">Italian</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Indian</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Japanese</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Thai</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">French</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Turkish</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Finnish</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">Mexican</Link>
                      </li>
                      <li>
                        <Link to="/categories/dessert">American</Link>
                      </li>
                    </ul>
                  )}
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
