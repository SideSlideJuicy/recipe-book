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
  isFavorite: Boolean,
  category: String,
  imageUrl: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const imageUrl = req.file ? req.file.filename : '';
    res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/recipes', async (req, res) => {
  try {
    const { title, ingredients, instructions, isFavorite, category, imageUrl } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      isFavorite,
      category,
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
