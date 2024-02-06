//: ----------------------------------------------------------------------------
/** middlewares/m.error.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";
import { log } from "../utils/display.log";

/** (404) ERROR HANDLING */
//: --------------------------------------------------------
const errorNotFound = (
    req: Request, res: Response, next: NextFunction) => {
    log("error");
    console.error("ERR:", "Page Not Found");
    next();
}

/** (*) ERROR HANDLING */
//: --------------------------------------------------------
const errorHandler = ( err: Error,
    req: Request, res: Response, next: NextFunction) => {
    log("error");
    console.error("ERR:", err.stack);
    console.log("==================================");
    res.status(500).type("text").send(err.message);
}

//: ----------------------------------------------------------------------------
export { errorNotFound, errorHandler };
