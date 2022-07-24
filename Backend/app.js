const express = require('express');
var cors = require('cors')
const { databaseConnect } = require('./config/database');
const cookieParser = require("cookie-parser");
const post = require("./routes/post");
const user = require("./routes/user");
const app = express();
databaseConnect();
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(
        {
            path: 'Backend/config/config.env'
        }
    )
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", post);
app.use("/api/v1", user);
module.exports = app;