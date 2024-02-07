//: ----------------------------------------------------------------------------
/** controllers/get.movies.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";

import { uniqueMovies, randomMovie } from "../utils/movie.filters";
import { filterByGenre, filterByDuration } from "../utils/movie.filters";
import { jsonParse, checkPath, checkQuery, checkMode } from "../utils/script.utils";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** Custom Request interface (req.out) */
import { __Request } from "../@types";

/** MOVIES */
//: ----------------------------------------------------------------------------
const getMovies = async (
    req: __Request, res: Response, next: NextFunction) => {

    //: check path for (+/json) switch
    //: ----------------------------------------------------
    const json = checkPath(req.path);

    //: query
    //: ----------------------------------------------------
    const { duration, genres } = checkQuery(req.query);

    //: output (movies)
    //: ----------------------------------------------------
    let out: any[] = [];

    try {
        //: data: movies -> unique movies
        const movies = await db.getData("/movies");

        out = uniqueMovies(movies);

        //: modus operandi -> 1|2|3|4
        const mode = checkMode(duration, genres);

        log("md", mode);

        //: case (1) empty default -> random movie
        //: ------------------------------------------------
        if (1 == mode) {
            //: out = out.sort((x: any) => - x.id);
            out = randomMovie(out);
            log("m1");
        }

        //: case (2) only duration -> random movie
        //: ------------------------------------------------
        if (2 == mode) {
            out = filterByDuration(out, duration);
            out = randomMovie(out);
            log("m2");
        }

        //: case (3) only genres
        //: ------------------------------------------------
        if (3 == mode) {
            out = filterByGenre(out, genres);
            log("m3");
        }

        //: case (4) genres + duration
        //: ------------------------------------------------
        if (4 == mode) {
            out = filterByGenre(out, genres);
            out = filterByDuration(out, duration);
            log("m4");
        }
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
export { getMovies };
