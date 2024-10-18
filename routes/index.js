const router = require("express").Router();

//! Auth Router
router.use("/api/v1/auth", require("./Auth.js"));

//! Auth Router
router.use("/api/v1/recipe", require("./Recipe.js"));

module.exports = router;
