//: ----------------------------------------------------------------------------
/** controllers/get.movie.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";

import { uniqueMovies, randomMovie } from "../utils/movie.filters";
import { jsonParse } from "../utils/script.utils";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** Custom Request interface (req.out) */
import { __Request } from "../@types";

/** MOVIE (random movie) + (optional) html */
//: ----------------------------------------------------------------------------
const getMovie = async (
    req: __Request, res: Response, next: NextFunction) => {
    log("mm");

    //: check last path element for (+/json) switch
    //: ----------------------------------------------------
    const path = req.path.split("/").filter((s) => s !== "");
    const json = (path.pop() === "json") ? true : false;

    //: output (movie)
    //: ----------------------------------------------------
    let out: any;

    try {
        //: data: movies
        const movies = await db.getData("/movies");
        //: pipe: unique movies -> random movie
        out = randomMovie(uniqueMovies(movies))[0];
    }
    catch (err) {
        /* istanbul ignore next */
        next(err);
    }
    finally {
        if (json) return res.json(out);
        req.out = out;
        next();
    }
};

//: ----------------------------------------------------------------------------
export { getMovie };
