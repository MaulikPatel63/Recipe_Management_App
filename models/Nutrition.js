// models/Nutrition.js
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  calories: { type: Number, default: 0 },                // Calories
  fat: { type: Number, default: 0 },                     // Total Fat in grams
  saturatedFat: { type: Number, default: 0 },                // Saturated Fat in grams
  transFat: { type: Number, default: 0 },                    // Trans Fat in grams
  cholesterol: { type: String, default: "<5mg" },            // Cholesterol
  sodium: { type: Number, default: 0 },                  // Sodium in mg
  potassium: { type: Number, default: 0 },               // Potassium in mg
  carbs: { type: Number, default: 0 },                   // Total Carbohydrates in grams
  dietaryFiber: { type: Number, default: 0 },            // Dietary Fiber in grams
  sugars: { type: Number, default: 0 },                      // Sugars in grams
  protein: { type: Number, default: 0 },                 // Protein in grams
  vitaminA: { type: Number, default: 0 },                    // Vitamin A Daily Value %
  vitaminC: { type: Number, default: 0 },                    // Vitamin C Daily Value %
  calcium: { type: Number, default: 0 },                     // Calcium Daily Value %
  iron: { type: Number, default: 0 },                        // Iron Daily Value %
}, { _id: false });  // Embedded schema, no separate _id field.

module.exports = nutritionSchema;
