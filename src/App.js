import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [addingRecipe, setAddingRecipe] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  const handleAddButtonClick = () => {
    setAddingRecipe(true);
  };

  const handleCancelAddRecipe = () => {
    setAddingRecipe(false);
  };

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, { ...newRecipe, id: Date.now() }]);
    setAddingRecipe(false);
  };

  useEffect(() => {
    // Fetch recipes from server and update the state
    fetch('/api/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const toggleTypeDropdown = () => {
    setShowTypeDropdown(!showTypeDropdown);
  };

  const toggleCuisineDropdown = () => {
    setShowCuisineDropdown(!showCuisineDropdown);
  };

  const toggleRatingDropdown = () => {
    setShowRatingDropdown(!showRatingDropdown);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1 className="app-title">Recipe Book</h1>
          <button className="add-recipe" onClick={handleAddButtonClick}>
            New Recipe
          </button>
        </header>

        {addingRecipe ? (
          <div className="add-view">
            <AddRecipe onCancel={handleCancelAddRecipe} onAdd={handleAddRecipe} />
          </div>
        ) : (
          <div className="main-view">
            <nav>
              <ul>
                <li>
                  <Link to="/">All Recipes</Link>
                </li>
                <li className="dropdown" onMouseEnter={toggleTypeDropdown} onMouseLeave={toggleTypeDropdown}>
                  <span>Type</span>
                  {showTypeDropdown && (
                    <ul>
                      <li>
                        <Link to="/type/breakfast">Breakfast</Link>
                      </li>
                      <li>
                        <Link to="/type/lunch">Lunch</Link>
                      </li>
                      <li>
                        <Link to="/type/dinner">Dinner</Link>
                      </li>
                      <li>
                        <Link to="/type/snack">Snack</Link>
                      </li>
                      <li>
                        <Link to="/type/appetizer (starter)">Appetizer (starter)</Link>
                      </li>
                      <li>
                        <Link to="/type/main course (entrée)">Main Course (entrée)</Link>
                      </li>
                      <li>
                        <Link to="/type/side dish">Side Dish</Link>
                      </li>
                      <li>
                        <Link to="/type/dessert">Dessert</Link>
                      </li>
                      <li>
                        <Link to="/type/supper">Supper</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="dropdown" onMouseEnter={toggleCuisineDropdown} onMouseLeave={toggleCuisineDropdown}>
                  <span>Cuisine</span>
                  {showCuisineDropdown && (
                    <ul>
                      <li>
                        <Link to="/cuisine/Italian">Italian</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/Indian">Indian</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/Turkish">Turkish</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/Finnish">Finnish</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/Thai">Thai</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/French">French</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/Mexican">Mexican</Link>
                      </li>
                      <li>
                        <Link to="/cuisine/American">American</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="dropdown" onMouseEnter={toggleRatingDropdown} onMouseLeave={toggleRatingDropdown}>
                  <span>Rating</span>
                  {showRatingDropdown && (
                    <ul>
                      <li>
                        <Link to="/rating/1 star">1</Link>
                      </li>
                      <li>
                        <Link to="/rating/2 stars">2</Link>
                      </li>
                      <li>
                        <Link to="/rating/3 stars">3</Link>
                      </li>
                      <li>
                        <Link to="/rating/4 stars">4</Link>
                      </li>
                      <li>
                        <Link to="/rating/5 stars">5</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<RecipeList recipes={recipes} />} />
              <Route path="/type/:type" element={<RecipeList recipes={recipes} />} />
              <Route path="/cuisine/:cuisine" element={<RecipeList recipes={recipes} />} />
              <Route path="/rating/:rating" element={<RecipeList recipes={recipes} />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
