require('dotenv');
const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

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

const user = require("./models/user")
const driver = require("./models/driver")
const phone = require("./models/phone")
const package = require("./models/package")
const order = require("./models/order")
const invoice = require("./models/invoice")
const schedule = require("./models/booking")

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});