require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const server = require("./api/schema");

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost/xpagent", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`mongodb connected`);
  })
  .catch(err => {
    console.log(err);
  });

// Apply Apollo
server.applyMiddleware({ app });

// Apply Cors Unblocker
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Run server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
