//: ----------------------------------------------------------------------------
/** app/app.ts */
/** ------------------------------------------------------------------------- */
import express, { Application } from "express";
import bodyParser from "body-parser";

import appRouter from "./router";

import { errorNotFound } from "../middlewares/m.error";
import { errorHandler } from "../middlewares/m.error";

const app: Application = express();

//: SETUP
//: ----------------------------------------------------------------------------

//: number of spaces for indentation
app.set("json spaces", 2);

//: views
app.set("views", "./views");

//: view engine
app.set("view engine", "ejs");

//: JSON parse
app.use(bodyParser.json());
app.use(express.json());

//: static resources
app.use(express.static("public"));

//: ROUTER
//: --------------------------------------------------------
app.use("/", appRouter);

//: ERROR HANDLING
//: --------------------------------------------------------
app.use("*", errorNotFound);
app.use(errorHandler);

//: ----------------------------------------------------------------------------
export default app;
