//: ----------------------------------------------------------------------------
/** controllers/get.movies.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";

import { uniqueMovies, randomMovie } from "../utils/movie.filters";
import { filterByGenre, filterByDuration } from "../utils/movie.filters";
import { jsonParse, getPath } from "../utils/script.utils";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** Custom Request interface (req.out) */
import { __Request } from "../@types";

/** MOVIES */
//: ----------------------------------------------------------------------------
const getMovies = async (
    req: __Request, res: Response, next: NextFunction) => {

    //: check last path element for (+/json) switch
    //: ----------------------------------------------------
    const path = getPath(req.path).at(-1);
    const json = (path === "json") ? true : false;

    //: query
    //: ----------------------------------------------------
    const query = req.query as any;

    let duration = query.d; //: ?d=100
    let genres = query.g; ////: ?g=Comedy,Fantasy,Romance
    let complete = query.q; //: ?q={"runtime":"100","genres":["Comedy"]}

    //: simple query -> create genres array
    //: ----------------------------------------------------
    try { genres = (genres as string).split(","); } catch {};

    //: json query -> map runtime & create genres array
    //: ----------------------------------------------------
    try {
        duration = JSON.parse(complete).runtime;
        genres = JSON.parse(complete).genres;
        if (genres.length === 0) genres = undefined;
    } catch {};

    //: output (movies)
    //: ----------------------------------------------------
    let out: any[] = [];

    try {
        //: data: movies -> unique movies
        const movies = await db.getData("/movies");
        out = uniqueMovies(movies);

        //: modus operandi
        let mode;

        if (!duration && !genres) mode = 1;
        if (duration && !genres) mode = 2;
        if (!duration && genres) mode = 3;
        if (duration && genres) mode = 4;

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
            out = filterByDuration(out, { duration });
            out = randomMovie(out);
            log("m2");
        }

        //: case (3) only genres
        //: ------------------------------------------------
        if (3 == mode) {
            out = filterByGenre(out, { genres });
            log("m3");
        }

        //: case (4) genres + duration
        //: ------------------------------------------------
        if (4 == mode) {
            out = filterByGenre(out, { genres });
            out = filterByDuration(out, { duration });
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
