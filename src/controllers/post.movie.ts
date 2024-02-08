//: ----------------------------------------------------------------------------
/** controllers/post.movie.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";

import { validateMovie } from "../utils/movie.validator";
import { jsonParse, getId } from "../utils/script.utils";
import { log } from "../utils/display.log";
import { db } from "../config/db";

/** MAKE (movie) POST */
//: ----------------------------------------------------------------------------
const postMovie = async (
    req: Request, res: Response, next: NextFunction) => {
    log("mp");

    //: body
    const body = req.body as any;

    //: output
    let out: any;

    try {
        //: data: movies & genres
        const data = await db.getData("/");

        let movies = data.movies;
        let genres = data.genres;

        //: json parse
        const m = jsonParse(JSON.stringify(body));

        //: validation -> break on failure
        //: ------------------------------------------------
        const validate = validateMovie(m, genres) || "OK";

        log("va", validate);

        if (validate !== "OK") return res.json({ validate });
        //: ------------------------------------------------

        //: calculate & insert id
        const obj = { id: getId(movies), ...m };

        //: insert into db
        await db.push("/movies[]", obj, true);

        //: get last insert
        out = await db.getData("/movies[-1]");

        console.log(out);
        res.json(out);

    } catch (err) {
        /* istanbul ignore next */
        next(err);
    }
    finally {
        console.log("----------------------------------");
    }
};

//: ----------------------------------------------------------------------------
export { postMovie };
