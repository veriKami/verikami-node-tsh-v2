//: ----------------------------------------------------------------------------
/** renders/make.movie.ts */
/** ------------------------------------------------------------------------- */
import { RequestHandler } from "express";
import { log } from "../utils/display.log";

/** MAKE (movie) GET */
//: ----------------------------------------------------------------------------
const makeMovie: RequestHandler = (req, res, next) => {
    log("mg");
    log("html");
    res.render("make", {
        title: "Make",
        out: null
    });
};

//: ----------------------------------------------------------------------------
export { makeMovie };
