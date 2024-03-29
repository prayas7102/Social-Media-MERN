const express = require('express');
var cors = require('cors');
const corsOptions = {
    credentials: true,
    ///..other options
};

const app = express();
app.use(cors(corsOptions));

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(
        {
            path: 'config/config.env'
        }
    )
}
const { databaseConnect } = require('./config/database');
const cookieParser = require("cookie-parser");
const post = require("./routes/post");
const user = require("./routes/user");
databaseConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", post);
app.use("/api/v1", user);
module.exports = app;