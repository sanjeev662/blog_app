const connectToMongo = require('./db');
const path = require('path')
const cors = require('cors')
const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const cloudinary = require("cloudinary").v2;
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('static'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

connectToMongo(); 

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
});

app.use(cors());
app.use(express.json());

app.use('/blog',require('./routes/blog'));

app.listen(process.env.PORT || port, () => {
    console.log(`Server started on  port ${port}`);
})