//: ----------------------------------------------------------------------------
/** middlewares/m.error.ts */
/** ------------------------------------------------------------------------- */
import { RequestHandler, ErrorRequestHandler } from "express";
import { log } from "../utils/display.log";

/** (404) ERROR HANDLING */
//: ----------------------------------------------------------------------------
const errorNotFound: RequestHandler = (req, res, next) => {
    log("error");
    console.error("ERR:", "Page Not Found");
    next();
};

/** (*) ERROR HANDLING */
//: ----------------------------------------------------------------------------
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    log("error");
    console.error("ERR:", err.stack);
    console.log("==================================");
    res.status(500).type("text").send(err.message);
};

//: ----------------------------------------------------------------------------
export { errorNotFound, errorHandler };
