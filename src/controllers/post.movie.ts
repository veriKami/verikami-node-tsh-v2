//: ----------------------------------------------------------------------------
/** controllers/post.movie.ts */
/** ------------------------------------------------------------------------- */
import { RequestHandler } from "express";

import { validateMovie } from "../utils/movie.validator";
import { jsonParse, getId } from "../utils/script.utils";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** MAKE (movie) POST */
//: ----------------------------------------------------------------------------
const postMovie: RequestHandler = async (req, res, next) => {
    log("mp");

    //: body
    const body = req.body as any;

    //: output
    let out: any = {};

    try {
        //: data: movies & genres
        const data = await db.getData("/");

        let movies = data.movies;
        let genres = data.genres;

        //: json parse
        const obj = jsonParse(JSON.stringify(body));

        //: validation -> break on failure
        //: ------------------------------------------------
        const validate = validateMovie(obj, genres);

        log("va", validate || "-- DONE ----------------");

        if (validate) return res.json({ validate });
        //: ------------------------------------------------

        //: calculate & insert id
        const movie = { id: getId(movies), ...obj };

        //: insert into db
        await db.push("/movies[]", movie, true);

        //: get last insert
        out = await db.getData("/movies[-1]");

        console.log(out);
        res.json(out);
    }
    catch (err) {
        /* istanbul ignore next */
        next(err);
    }
    finally {
        console.log("----------------------------------");
    }
};

//: ----------------------------------------------------------------------------
export { postMovie };
