const Recipe = require("../models/Recipe.js");
const User = require("../models/User.js");

const recipeAdd = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const notesWithUser = req.body.notes?.map((note) => ({
      ...note,
      user: user._id,
    }));

    const reviewWithUser = req.body.review?.map((review) => ({
      ...review,
      user: user._id,
    }));

    const newRecipe = new Recipe({
      ...req.body,
      user: user._id,
      notes: notesWithUser || [],
      review: reviewWithUser || [],
    });
    await newRecipe.save();

    return res
      .status(200)
      .json({ message: "Recipe Created Successfully!", data: newRecipe });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Recipe controller error", err: error.message });
  }
};

const recipeGet = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 1;

    const recipes = await Recipe.find()
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
    const totalRecipes = await Recipe.countDocuments();
    return res.status(200).json({
      message: "The recipes was retrieved successfully!",
      pagination: {
        total: totalRecipes,
        currentPage: pageNum,
        totalPages: Math.ceil(totalRecipes / limitNum),
      },
      data: recipes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const recipeGetById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipes = await Recipe.find({_id:id});
    if (!recipes) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).json({
      message: "The recipes was retrieved successfully!",
      data: recipes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const recipeGetByName = async (req, res) => {
  try {
    const { recipeName } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 1;

    const recipes = await Recipe.find({
      recipeName: { $regex: new RegExp(recipeName, "i") },
    })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    if (!recipes) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const totalRecipes = await Recipe.countDocuments({
      recipeName: { $regex: new RegExp(recipeName, "i") }, // Same regex for counting
    });

    return res.status(200).json({
      message: "The recipes was retrieved successfully!",
      pagination: {
        total: totalRecipes,
        currentPage: pageNum,
        totalPages: Math.ceil(totalRecipes / limitNum),
      },
      data: recipes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const recipeUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res
      .status(200)
      .json({ message: "Recipe Created Successfully!", data: updatedRecipe });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const recipeDelete = async (req, res) => {
  try {
    const { id } = req.params;

    await Recipe.findByIdAndDelete(id);
    return res.status(200).json({ message: "Recipe Deleted Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const reviewAdd = async (req, res) => {
  try {
    const { recipeId, stars, description } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newReview = {
      user: user._id,
      stars,
      description,
    };

    recipe.review.push(newReview);

    await recipe.save();
    return res.status(200).json({ message: "Review Created Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Add Review controller error", err: error.message });
  }
};

const reviewGet = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipeId } = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const review = recipe.review.id(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res
      .status(200)
      .json({ message: "Review retrieved Successfully!", data: review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Review retrieved controller error",
      err: error.message,
    });
  }
};

const reviewUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const { recipeId, stars, description } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const review = recipe.review.id(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    if (stars) review.stars = stars;
    if (description) review.description = description;

    await recipe.save();
    return res.status(200).json({ message: "Review Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Review Updated controller error", err: error.message });
  }
};

const reviewDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const { recipeId } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const review = recipe.review.id(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }
    review.remove();
    await recipe.save();
    return res.status(200).json({ message: "Review Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Review Updated controller error", err: error.message });
  }
};

const noteAdd = async (req, res) => {
  try {
    const { recipeId, title, description } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const newNote = {
      user: user._id,
      title,
      description,
    };

    recipe.notes.push(newNote);

    await recipe.save();
    return res.status(200).json({ message: "Notes Created Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Add Notes controller error", err: error.message });
  }
};

const noteUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const { recipeId, title, description } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const notes = recipe.notes.id(id);
    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    if (notes.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    if (title) notes.title = title;
    if (description) notes.description = description;

    await recipe.save();
    return res.status(200).json({ message: "Notes Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Notes Updated controller error", err: error.message });
  }
};

const noteDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const { recipeId } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User Does not exists" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const noteIndex = recipe.notes.findIndex(
      (note) => note._id.toString() === id
    );
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (recipe.notes[noteIndex].user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this note" });
    }

    recipe.notes.splice(noteIndex, 1); // Remove the note
    await recipe.save();
    return res.status(200).json({ message: "Notes Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Notes Updated controller error", err: error.message });
  }
};

const recipeImgUpload = async (req, res) => {
  try {
    res.status(200).json({
      message: "Image uploaded successfully!",
      imagePath: req.file.path,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  }
};

module.exports = {
  recipeAdd,
  recipeGetById,
  recipeGetByName,
  recipeGet,
  recipeUpdate,
  recipeDelete,
  reviewAdd,
  reviewGet,
  reviewUpdate,
  reviewDelete,
  noteAdd,
  noteUpdate,
  noteDelete,
  recipeImgUpload,
};
