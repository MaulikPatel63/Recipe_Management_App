const Joi = require("joi");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {
  recipeAdd,
  recipeGet,
  recipeUpdate,
  recipeDelete,
  reviewAdd,
  reviewUpdate,
  reviewGet,
  recipeGetByName,
  reviewDelete,
  noteAdd,
  noteUpdate,
  noteDelete,
  recipeImgUpload,
  recipeGetById,
} = require("../controllers/RecipeController.js");
const { validateRequest } = require("../middleware/validate-request.js");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

//? recipe router
router.post("/recipe-add", AddValidation, recipeAdd);
router.get("/recipe-get", recipeGet);
router.get("/recipe-get/:id", recipeGetById);
router.get("/recipe-get/:recipeName", recipeGetByName);
router.put("/recipe-update/:id", UpdateValidation, recipeUpdate);
router.delete("/recipe-delete/:id", recipeDelete);

//? review router
router.post("/review-add", ReviewAddValidation, reviewAdd);
router.get("/review-get/:id", reviewGet);
router.put("/review-update/:id", ReviewUpdateValidation, reviewUpdate);
router.delete("/review-delete/:id", reviewDelete);

//? note router
router.post("/note-add", NoteAddValidation, noteAdd);
router.put("/note-update/:id", NoteUpdateValidation, noteUpdate);
router.delete("/note-delete/:id", noteDelete);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit: 5MB
  fileFilter: fileFilter,
});

router.delete("/note-delete/:id", noteDelete);

// Route to upload recipe image
router.post("/recipe-upload", upload.single("image"), recipeImgUpload);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    recipeName: Joi.string().min(3).max(50).required(),
    recipeTitle: Joi.string().min(5).max(100).required(),
    ingredients: Joi.array().items(Joi.string().min(1)).required(),
    instructions: Joi.string().min(10).required(),
    cuisineType: Joi.string()
      .valid("Indian", "Mexican", "Italian", "Chinese", "Other")
      .required(),
    cookingTime: Joi.number().min(1).max(300).required(), // In minutes
    servings: Joi.number().min(1).required(),
    image: Joi.string().optional(),
    nutrition: Joi.object({
      calories: Joi.number().min(0).required(),
      fat: Joi.number().min(0).required(),
      saturatedFat: Joi.number().min(0).optional(),
      transFat: Joi.number().min(0).optional(),
      cholesterol: Joi.string().optional(),
      sodium: Joi.number().min(0).required(),
      potassium: Joi.number().min(0).required(),
      carbs: Joi.number().min(0).required(),
      dietaryFiber: Joi.number().min(0).required(),
      sugars: Joi.number().min(0).optional(),
      protein: Joi.number().min(0).required(),
      vitaminA: Joi.number().min(0).optional(),
      vitaminC: Joi.number().min(0).optional(),
      calcium: Joi.number().min(0).optional(),
      iron: Joi.number().min(0).optional(),
    }).required(),
    notes: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().optional(),
          description: Joi.string().optional(),
        })
      )
      .optional(),
    review: Joi.array()
      .items(
        Joi.object({
          stars: Joi.number().min(1).max(5).optional(),
          description: Joi.string().optional(),
          reviewDate: Joi.date().optional(),
        })
      )
      .optional(),
  });
  validateRequest(req, res, next, schema);
}
function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    recipeName: Joi.string().min(3).max(50).optional(),
    recipeTitle: Joi.string().min(5).max(100).optional(),
    ingredients: Joi.array().items(Joi.string().min(1)).optional(),
    instructions: Joi.string().min(10).optional(),
    cuisineType: Joi.string()
      .valid("Indian", "Mexican", "Italian", "Chinese", "Other")
      .optional(),
    cookingTime: Joi.number().min(1).max(300).optional(),
    servings: Joi.number().min(1).optional(),
    image: Joi.string().optional(),
    nutrition: Joi.object({
      calories: Joi.number().min(0).optional(),
      fat: Joi.number().min(0).optional(),
      saturatedFat: Joi.number().min(0).optional(),
      transFat: Joi.number().min(0).optional(),
      cholesterol: Joi.string().optional(),
      sodium: Joi.number().min(0).optional(),
      potassium: Joi.number().min(0).optional(),
      carbs: Joi.number().min(0).optional(),
      dietaryFiber: Joi.number().min(0).optional(),
      sugars: Joi.number().min(0).optional(),
      protein: Joi.number().min(0).optional(),
      vitaminA: Joi.number().min(0).optional(),
      vitaminC: Joi.number().min(0).optional(),
      calcium: Joi.number().min(0).optional(),
      iron: Joi.number().min(0).optional(),
    }).optional(),
  });
  validateRequest(req, res, next, schema);
}
function ReviewAddValidation(req, res, next) {
  const schema = Joi.object({
    recipeId: Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .required(),
    stars: Joi.number().min(1).max(5).required(),
    description: Joi.string().required(),
  });
  validateRequest(req, res, next, schema);
}
function ReviewUpdateValidation(req, res, next) {
  const schema = Joi.object({
    recipeId: Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .optional(),
    stars: Joi.number().min(1).max(5).optional(),
    description: Joi.string().optional(),
  });
  validateRequest(req, res, next, schema);
}
function NoteAddValidation(req, res, next) {
  const schema = Joi.object({
    recipeId: Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  validateRequest(req, res, next, schema);
}
function NoteUpdateValidation(req, res, next) {
  const schema = Joi.object({
    recipeId: Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
