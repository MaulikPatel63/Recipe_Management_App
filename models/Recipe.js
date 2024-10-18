// models/Recipe.js
const mongoose = require("mongoose");
const nutritionSchema = require("./Nutrition"); // Import the nutrition schema
const noteSchema = require("./Note");
const reviewSchema = require("./Review");

const recipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String, required: true },
    recipeTitle: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    cuisineType: { type: String, required: true },
    cookingTime: { type: Number, required: true }, // In minutes
    servings: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, default: "https://via.placeholder.com/150" }, // Image URL
    nutrition: nutritionSchema, // Embedded Nutrition schema
    notes: [noteSchema],
    review: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
