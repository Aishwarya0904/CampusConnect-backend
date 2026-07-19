const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { category, title, description } = req.body;

    if (!category || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const post = await Post.create({
      category,
      title,
      description,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const filter = {};

if (req.query.category) {
  filter.category = req.query.category;
}

const posts = await Post.find(filter)
  .populate("author", "name email")
  .sort({ createdAt: -1 });
    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Post (Admin)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};