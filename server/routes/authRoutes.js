// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Private route (requires JWT)
router.get("/me", authMiddleware, getMe);

module.exports = router;
