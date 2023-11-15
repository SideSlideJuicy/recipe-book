import React, { useState } from 'react';
import HelpIcon from './HelpIcon.jsx';
import './AddRecipe.css';

const AddRecipe = ({ onCancel, onAdd }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [rating, setRating] = useState(0);
    const [preparationTime, setPreparationTime] = useState('');
    const [type, setType] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [servings, setServings] = useState(1)
    const [image, setImage] = useState(null);

    const [hoverRating, setHoverRating] = useState(0);

    const [showTypeHelp, setShowTypeHelp] = useState(false);
    const [showCuisineHelp, setShowCuisineHelp] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file);

        setImage(file);
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!image) {
            console.error('No image selected');
            return;
        }

        const newRecipe = {
            title,
            ingredients,
            instructions,
            rating,
            preparationTime,
            type,
            cuisine,
            servings,
        };

        try {
            // Handle image upload
            const formData = new FormData();
            formData.append('image', image);

            console.log('Starting image upload...');
            const responseImage = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!responseImage.ok) {
                console.error('Failed to upload image:', responseImage.status, responseImage.statusText);
                return;
            }

            const { imageUrl } = await responseImage.json();
            console.log('Image uploaded successfully. Image URL:', imageUrl);

            // Attach the imageUrl to the new recipe
            newRecipe.imageUrl = imageUrl;

            console.log('Adding main data...');
            const responseMain = await fetch('http://localhost:3001/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });

            if (responseMain.ok) {
                console.log('Recipe added successfully');
                onAdd(newRecipe);
            } else {
                console.error('Failed to add main data:', responseMain.status, responseMain.statusText);
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div className="add-recipe-container">
            <h2>Add New Recipe</h2>
        
            <form onSubmit={handleAdd}>
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
      
                <div className="input-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        className="textarea"
                        id="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
      
                <div className="input-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        className="textarea"
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
            
                <div className="input-group">
                    <label className='icon-group'>Type
                    <div className="help-icon" onMouseEnter={() => setShowTypeHelp(true)} onMouseLeave={() => setShowTypeHelp(false)}>
                        <HelpIcon />
                        {showTypeHelp && (
                            <div className="help-container">
                                <p>
                                Meal types can vary across cultures, regions, and individual preferences. Here's a list of common meal types:<br /><br />

                                <strong>Breakfast:</strong> Typically the first meal of the day.<br />
                                Examples: Cereal, eggs, toast, pancakes, oatmeal.<br /><br />
                                
                                <strong>Lunch:</strong> Midday meal.<br />
                                Examples: Sandwiches, salads, soups.<br /><br />

                                <strong>Dinner:</strong> Main meal of the day, often served in the evening.<br />
                                Examples: Meat or plant-based protein, vegetables, starch (rice, pasta, potatoes).<br /><br />

                                <strong>Snack:</strong> Small, casual meals between main meals.<br />
                                Examples: Nuts, fruit, yogurt.<br /><br />

                                <strong>Appetizer (Starter):</strong> Small dishes served before the main course.<br />
                                Examples: Shrimp cocktail, bruschetta, spring rolls.<br /><br />

                                <strong>Main Course (Entrée):</strong> The primary dish in a meal.<br />
                                Examples: Steak, chicken, pasta.<br /><br />

                                <strong>Side Dish:</strong> Accompanying dishes served alongside the main course.<br />
                                Examples: Mashed potatoes, steamed vegetables, coleslaw.<br /><br />
                                
                                <strong>Dessert:</strong> Sweet dishes served at the end of a meal.<br />
                                Examples: Cake, ice cream, fruit.<br /><br />

                                <strong>Supper:</strong> A light evening meal, sometimes interchangeable with dinner.<br />
                                Examples: Soup, sandwiches.<br /><br />
                                </p>
                            </div>
                        )}
                    </div>
                    </label>

                    <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="None">Select Type</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                        <option value="appetizer (Starter)">Appetizer (Starter)</option>
                        <option value="main course (Entrée)">Main Course (Entrée)</option>
                        <option value="side dish">Side Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="supper">Supper</option>
                    </select>
                </div>
      
                <div className="input-group">
                    <label className='icon-group'>Cuisine
                    <div className='help-icon' onMouseEnter={() => setShowCuisineHelp(true)} onMouseLeave={() => setShowCuisineHelp(false)}>
                        <HelpIcon />
                        {showCuisineHelp && (
                            <div className="help-container">
                                <p>
                                The popularity of cuisines can vary widely based on personal preferences, cultural influences, and regional availability. However, some cuisines are generally well-loved around the world. Here are a few of the most favorite cuisines globally:<br /><br />

                                <strong>Italian:</strong> Known for its pasta, pizza, and flavorful sauces.<br /><br />

                                <strong>Chinese:</strong> Diverse and rich, with a variety of regional styles and flavors.<br /><br />
                                
                                <strong>Indian:</strong> Characterized by aromatic spices, curries, and a wide range of vegetarian and non-vegetarian dishes.<br /><br />
                                
                                <strong>Japanese:</strong> Emphasizes fresh, seasonal ingredients and includes sushi, sashimi, and ramen.<br /><br />
                                
                                <strong>Mexican:</strong> Known for its bold flavors, including tacos, enchiladas, and guacamole.<br /><br />
                                
                                <strong>French:</strong> Renowned for its culinary techniques, pastries, and gourmet dishes.<br /><br />
                                
                                <strong>Thai:</strong> Combines sweet, sour, salty, and spicy flavors, with dishes like pad Thai and green curry.<br /><br />
                                
                                <strong>American:</strong> Diverse and influenced by various cultures, with popular dishes like burgers, hot dogs, and barbecue.<br /><br />
                                </p>
                            </div>
                        )}
                    </div>
                    </label>

                    <select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder='Select cuisine' required>
                        <option value="None">Select Cuisine</option>
                        <option value="Italian">Italian</option>
                        <option value="Indian">Indian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Thai">Thai</option>
                        <option value="French">French</option>
                        <option value="Turkish">Turkish</option>
                        <option value="Finnish">Finnish</option>
                        <option value="Mexican">Mexican</option>
                        <option value="American">American</option>
                    </select>

                </div>

                <div className="input-group">
                    <label htmlFor="preparationTime">Preparation Time</label>
                    <input
                        type="text"
                        id="preparationTime"
                        name="preparationTime"
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                        placeholder="hh:mm"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="servings">Servings</label>
                    <input
                        type="number"
                        id="servings"
                        name="servings"
                        min="1"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        required
                    />
                </div>
      
                <div className="input-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={handleImageChange} accept="image/*" name="image" />
                </div>
      
                <div className="input-group">
                    <label htmlFor="rating">Rating</label>
                    <div className="rating-slider">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={
                            star <= (hoverRating || rating) ? 'star-filled' : 'star-empty'
                            }
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                        ))}
                    </div>
                </div>
      
                <div className="button-container">
                    <button className="add-button" type="submit">Add</button>
                    <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
      
};

export default AddRecipe;
