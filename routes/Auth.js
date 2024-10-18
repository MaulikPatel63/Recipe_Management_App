const express = require("express");
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  logout,
  authCheck,
  updateRole,
} = require("../controllers/AuthController");

const router = express.Router();

router.get("/recipe-test", (req, res) => {
  return res
    .status(200)
    .json({ message: "The recipes Page was retrieved successfully!" });
});

router.post("/signup", register);
router.post("/login", login);
router.post("/password-reset", requestPasswordReset);
router.post("/password-reset/:token", resetPassword);
router.get("/authCheck", authCheck);
router.post("/logout", logout);

module.exports = router;
