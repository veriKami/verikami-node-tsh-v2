//: ----------------------------------------------------------------------------
/** controllers/get.movie.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";

import { uniqueMovies, randomMovie } from "../utils/movie.filters";
import { jsonParse, checkPath } from "../utils/script.utils";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** Custom Request interface (req.out) */
import { __Request } from "../@types";

/** MOVIE (random movie) + (optional) html */
//: ----------------------------------------------------------------------------
const getMovie = async (
    req: __Request, res: Response, next: NextFunction) => {
    log("mm");

    //: check path for (+/json) switch
    const json = checkPath(req.path);

    //: output (movie)
    let out: any;

    try {
        //: data: movies
        //: pipe: unique movies -> random movie
        const movies = await db.getData("/movies");
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
