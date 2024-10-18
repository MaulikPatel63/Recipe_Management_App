const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true },
    reviewDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Export only the schema, not the model
module.exports = reviewSchema;
