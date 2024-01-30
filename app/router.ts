//: ----------------------------------------------------------------------------
//: veriKami // router.ts
//: ----------------------------------------------------------------------------
import express, { Router, Request, Response, NextFunction } from "express";

import { jsonParse, uniqueMovies, getRandomMovie } from "./utils";
import { filterByGenre, filterByDuration } from "./utils";
import { validateMovie } from "./validator";
import { db } from "./db";

const router: Router = express.Router();

//: INTRO (random movie) + (html) interface
//: ----------------------------------------------------------------------------
router.get("/",
    async (req: Request, res: Response, next: NextFunction) => {

    console.log("INTRO (html)");

    try {
        //: data: movies
        const movies = await db.getData("/movies");

        //: unique movies
        let out = uniqueMovies(movies);
        //: random movie
        out = getRandomMovie(out)[0];

        //: RENDER (html)
        //: ---------------------------------
        res.render("www", { title: "Movies",
            out: JSON.stringify(out, null, 2)
        });

    } catch (err) {
        /* istanbul ignore next */
        next(err);
    }
});

//: MOVIE (random movie)
//: ----------------------------------------------------------------------------
router.get("/movie",
    async (req: Request, res: Response, next: NextFunction) => {

    console.log("MOVIE");

    try {
        //: data: movies
        const movies = await db.getData("/movies");

        //: unique movies
        let out = uniqueMovies(movies);
        //: random movie
        out = getRandomMovie(out)[0];

        res.json(out);

    } catch (err) {
        /* istanbul ignore next */
        next(err);
    }
});

//: MOVIES
//: ----------------------------------------------------------------------------
router.get('/movies',
    async (req: Request, res: Response, next: NextFunction) => {

    //: query
    let q = req.query as any;

    //: params
    let duration = q.d || false;
    let genres = q.g || false;

    try {
        //: array case
        try { genres = JSON.parse(genres); } catch {};
        //: string case
        try { genres = (genres as string).split(",") } catch {};

        //: data: movies & genres
        const data = await db.getData("/");
        let movies = data.movies;

        //: unique movies
        movies = uniqueMovies(movies);

        //: output (movies)
        let out: any[] = [];

        //: case (1) empty default
        //: ----------------------------------------------------------
        if (!duration && !genres) {
            console.log("MOVIES: default");
            //: random movie
            //out = getRandomMovie(movies);
            //: all movies (descending order)
            out = movies.sort((x: any) => - x.id);
        }

        //: case (2) only duration
        //: ----------------------------------------------------------
        else if (duration && !genres) {
            console.log("MOVIES: only duration");
            //: filter min/max
            out = filterByDuration(movies, duration);
            //: random movie
            out = getRandomMovie(out);
        }

        //: case (3) only genres
        //: ----------------------------------------------------------
        else if (!duration && genres) {
            console.log("MOVIES: only genres");
            //: filter by genres
            out = filterByGenre(movies, genres);
        }

        //: case (4) genres + duration
        //: ----------------------------------------------------------
        else if (duration && genres) {
            console.log("MOVIES: genres + duration");
            //: filter by genres
            out = filterByGenre(movies, genres);
            //: filter min/max
            out = filterByDuration(out, duration);
        }

        res.json(out);

    } catch (err) {
        /* istanbul ignore next */
        next(err);
    }
});

//: MAKE (movie) POST
//: ----------------------------------------------------------------------------
router.post("/make",
    async (req: Request, res: Response, next: NextFunction) => {

    console.log(`MOVIE (make) ${req.method}`);

    //: query & body
    const query = req.query as any;
    const body = req.body as any;

    let out = JSON.stringify(body);

    //: GET redirect (quick hack)
    res.redirect(`/make/?m=${out}`);

    //res.json(body);
});

//: MAKE (movie) GET
//: ----------------------------------------------------------------------------
router.get("/make",
    async (req: Request, res: Response, next: NextFunction) => {

    console.log(`MOVIE (make) ${req.method}`);

    //: query
    const query = req.query as any;

    //: movie
    let m = query.m || false;

    //: RENDER (html) if empty (m) query
    //: --------------------------------------------------------------
    if (!m) return res.render("make", { title: "Make", out: null });

    try {
        //: data: movies & genres
        const data = await db.getData("/");
        let movies = data.movies;
        let genres = data.genres;

        //: json parse
        m = jsonParse(m);

        //: validation
        const validate = validateMovie(m, genres) || "OK";

        console.log(`validate: ${validate}`);

        //: BREAK ON FAILURE -----------------------------------------
        if (validate !== "OK") return res.json({ validate });

        //: get last object to calculate id
        //: augmentation: calculate & insert id
        const last = movies[movies.length - 1];
        const obj = { id: last.id + 1, ...m };

        //: insert into db
        await db.push("/movies[]", obj, true);

        //: get last insert
        let out = await db.getData("/movies[-1]");

        console.log(out);

        res.json(out);

    } catch (err) {
        /* istanbul ignore next */
        next(err);
    }
});

//: TEST (next) ERROR
//: ----------------------------------------------------------------------------
router.get("/err",
    async (req: Request, res: Response, next: NextFunction) => {

    console.log("ERROR");

    try {
        throw Error("TEST (next) ERROR");
    } catch (err) {
        next(err);
    }
});

//: ----------------------------------------------------------------------------
export { router };
