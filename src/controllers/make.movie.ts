//: ----------------------------------------------------------------------------
/** controllers/make.movie.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";

import { log } from "../utils/display.log";

/** MAKE (movie) GET */
//: ----------------------------------------------------------------------------
const makeMovie = (
    req: Request, res: Response, next: NextFunction) => {
    log("mg");
    res.render("make", {
        title: "Make",
        out: null
    });
};

//: ----------------------------------------------------------------------------
export { makeMovie };
