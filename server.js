const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
  rating: Number,
  preparationTime: String,
  type: String,
  cuisine: String,
  servings: Number,
  imageUrl: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Fetch all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch recipes based on type
app.get('/api/recipes/type/:type', async (req, res) => {
    const { type } = req.params;
  
    try {
      const recipes = await Recipe.find({ type });
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Fetch recipes based on cuisine
  app.get('/api/recipes/cuisine/:cuisine', async (req, res) => {
    const { cuisine } = req.params;
  
    try {
      const recipes = await Recipe.find({ cuisine });
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Fetch recipes based on rating
  app.get('/api/recipes/rating/:rating', async (req, res) => {
    const { rating } = req.params;
  
    try {
      const recipes = await Recipe.find({ rating });
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const imageUrl = req.file ? req.file.filename : '';
    res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const { title, ingredients, instructions, rating, preparationTime, type, cuisine, servings, imageUrl } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      rating,
      preparationTime,
      type,
      cuisine,
      servings,
      imageUrl,
    });

    await newRecipe.save();

    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete recipe
app.delete('/api/recipes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
