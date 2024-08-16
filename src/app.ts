require("dotenv").config();
const compression = require("compression");
import express from "express";
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
import mongodbInstance from "@/dbs/init.mongodb";
mongodbInstance;

//check overload
import { checkOverload } from "@/helpers/check.connect";
//checkOverload();

//handle errors

//init routers
import router from "@/routes";
import { apiKey } from "@/auth/checkAuth";
app.use("", router);

module.exports = app;
