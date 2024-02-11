//: ----------------------------------------------------------------------------
/** controllers/get.movies.ts */
/** ------------------------------------------------------------------------- */
import { RequestHandler } from "express";
import { __Request } from "../@types";

import { checkPath, checkQuery } from "../utils/req.utils";
import { uniqueMovies, setMode } from "../utils/movie.filters";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** MOVIES (with conditions) + (optional) html */
//: ----------------------------------------------------------------------------
const getMovies: RequestHandler = async (req: __Request, res, next) => {

    //: path (html/json) switch
    const json = checkPath(req.path);

    //: check query params
    const { duration, genres } = checkQuery(req.query);

    //: output
    let out: any[] = [];

    try {
        //: data: movies -> unique movies
        const movies = await db.getData("/movies");
        out = uniqueMovies(movies);

        //: conditional selection
        out = setMode(out, duration, genres);
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
export { getMovies };
