const express = require("express");
const multer = require("multer");
const Blog = require("../models/Blog");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const Router = express.Router();

// const storage = multer.diskStorage({
//   destination: "./files",
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().getTime()}_${file.originalname}`);
//   },
// });

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("Only upload files with jpg, jpeg, png format."));
    }
    cb(null, true);
  },
});

//for posting blog
Router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const { path } = req.file;

    const result = await cloudinary.uploader.upload(path, {
      folder: "blog_images", // Optional folder in Cloudinary to store the images
    });

    const blog = new Blog({
      title,
      description,
      img_path: result.secure_url,
    });

    await blog.save();
    fs.unlinkSync(path);

    res.send("Blog uploaded successfully.");
  } catch (error) {
    res.status(400).send("Error while uploading blog. Try again later.");
  }
});

//for getting all blogs at a time
Router.get("/getAllBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.send(blogs);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting the list of blogs. Try again later.");
  }
});

//for getting specific blog detail by id
Router.get("/getBlogById/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.send(blog);
  } catch (error) {
    res.status(400).send("Error while getting the blog. Try again later.");
  }
});

// for deleting blog
Router.delete("/delete/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const imagePath = blog.img_path; 
    await cloudinary.uploader.destroy(imagePath);
    await Blog.findByIdAndDelete(blogId);

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});


Router.put("/update/:id", upload.single("file"), async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description } = req.body;
    const { path } = req.file;

    const updatedFields = {
      title,
      description,
      img_path: path,
    };

    const blog = await Blog.findByIdAndUpdate(blogId, updatedFields, {
      new: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.send(blog);
  } catch (error) {
    res.status(400).send("Error while updating the blog. Try again later.");
  }
});


module.exports = Router;
