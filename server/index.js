const express = require("express");
const connectToMongo = require("./db");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
});

// Routes
app.use("/blog", require("./routes/blog"));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
