//Package Decleration
const express = require("express");
const morgan = require('morgan')
const app = express();
const blogRouter = require('./router/blogRoute')
const dotenv = require("dotenv");
const db_connection = require("./db_connection/connection")
const cors = require("cors")
const bodyParser = require("body-parser")

//Defiened Middleware
app.use(morgan())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Environment Config
dotenv.config()

//Custome Functions for DB Connection
db_connection()

//Custome Middleware
app.use("/uploads",express.static("uploads"))
app.use("/",blogRouter)

//Export Module
module.exports = app;