//: ----------------------------------------------------------------------------
//: veriKami // app.ts
//: ----------------------------------------------------------------------------
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";

import { router } from "./router";

const app: Application = express();

//: ----------------------------------------------------------------------------
//: SETUP

//: number of spaces for indentation
app.set("json spaces", 2);

//: views
app.set("views", "./views");

//: view engine
app.set("view engine", "ejs");

//: JSON parse
app.use(bodyParser.json());
app.use(express.json());

//: static
app.use(express.static(path.join(__dirname, "public")));

//: ROUTER
//: ----------------------------------------------------------------------------
app.use("/", router);

//: ERROR HANDLING
//: ----------------------------------------------------------------------------
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    //res.status(500).send("ERROR");
    res.status(500).type("text").send(err.stack);
});

//: ----------------------------------------------------------------------------
export default app;
