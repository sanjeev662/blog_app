const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    img_path: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;