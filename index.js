require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// GraphQL
const server = require("./api/schema");

// Single Image
const singleImage = require("./api/helpers/imageUpload");

// Variables
const app = express();
const port = process.env.PORT || 5000;
const DBName = process.env.DB_NAME;
const DBUsername = process.env.DB_USERNAME;
const DBPassword = process.env.DB_PASSWORD;

// Connect Database
mongoose
  .connect(
    `mongodb+srv://${DBUsername}:${DBPassword}@xpagent-kdnc0.mongodb.net/${DBName}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log(`mongodb connected`);
  })
  .catch(err => {
    console.log(err);
  });

// Apply Cors Unblocker
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Get single image file
app.use(singleImage);

// Apply Apollo
server.applyMiddleware({ app });

// Run server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
