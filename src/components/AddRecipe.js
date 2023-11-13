import React, { useState } from 'react';
import './AddRecipe.css';

const AddRecipe = ({ onCancel, onAdd }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

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
            isFavorite,
            category,
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

            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Ingredients:</label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />

            <label>Instructions:</label>
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />

            <label>
            <input
                type="checkbox"
                checked={isFavorite}
                onChange={() => setIsFavorite(!isFavorite)}
            />
            Favorite
            </label>

            <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="main">Main</option>
                <option value="dinner">Dinner</option>
                {/* Add more categories as needed */}
            </select>
            </label>

            <label>
            Image:
            <input type="file" onChange={handleImageChange} accept="image/*" name="image"/>
            </label>

            <div className="button-container">
            <button className="add-button" type="submit">
                Add Recipe
            </button>
            <button className="cancel-button" type="button" onClick={onCancel}>
                Cancel
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddRecipe;