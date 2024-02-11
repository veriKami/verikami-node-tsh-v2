//: ----------------------------------------------------------------------------
/** controllers/get.movie.ts */
/** ------------------------------------------------------------------------- */
import { RequestHandler } from "express";
import { __Request } from "../@types";

import { checkPath } from "../utils/req.utils";
import { uniqueMovies, randomMovie } from "../utils/movie.filters";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** MOVIE (random movie) + (optional) html */
//: ----------------------------------------------------------------------------
const getMovie: RequestHandler = async (req: __Request, res, next) => {
    log("mm");

    //: path (html/json) switch
    const json = checkPath(req.path);

    //: output
    let out: any = {};

    try {
        //: data: movies -> unique movies -> random movie
        const movies = await db.getData("/movies");
        out = randomMovie(uniqueMovies(movies))[0];
    }
    catch (err) {
        /* istanbul ignore next */
        next(err);
    }
    finally {
        if (json) return res.json(out);
        res.locals.out = out;
        req.out = out; //: custom
        next();
    }
};

//: ----------------------------------------------------------------------------
export { getMovie };
