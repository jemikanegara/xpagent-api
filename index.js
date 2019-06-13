require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
const bodyParserGQL = require("body-parser-graphql");

// GraphQL
const server = require("./api/schema");

// Variables
const app = express();
const port = process.env.PORT || 5000;
const DBName = process.env.DB_NAME;
const DBUsername = process.env.DB_USERNAME;
const DBPassword = process.env.DB_PASSWORD;
const remoteDB = `mongodb+srv://${DBUsername}:${DBPassword}@xpagent-kdnc0.mongodb.net/${DBName}`;
const localDB = `mongodb://localhost/xpagent`;
const development = process.env.DEVELOPMENT;

// Connect Database
mongoose
  .connect(
    development ? localDB : remoteDB,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
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
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Parse application/graphql
app.use(bodyParserGQL.graphql());

// Get single image file
// app.use(singleImage);

// Apply Apollo
server.applyMiddleware({ app });

// Run server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
