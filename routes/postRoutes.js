const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/postController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Public
router.get("/", getPosts);

// Logged-in users
router.post("/", protect, createPost);

// Admin only
router.delete("/:id", protect, adminOnly, deletePost);

module.exports = router;