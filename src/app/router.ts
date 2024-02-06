//: ----------------------------------------------------------------------------
/** app/router.ts */
/** ------------------------------------------------------------------------- */
import express, { Router, Request, Response, NextFunction } from "express";

import { getMovie } from "../controllers/get.movie";
import { postMovie } from "../controllers/post.movie";
import { getMovies } from "../controllers/get.movies";
import { makeMovie } from "../controllers/make.movie";

import { html } from "../middlewares/m.render";
import { log } from "../utils/display.log";

const router: Router = express.Router();

/** ROUTES */
//: ----------------------------------------------------------------------------

//: html output (middleware)
//: --------------------------------------------------------
router.get("/", getMovie, html);
router.get("/movie", getMovie, html);
router.post("/movie", postMovie, html);
router.get("/movies", getMovies, html);
router.get("/make", makeMovie, html);

//: json output (+/json)
//: --------------------------------------------------------
router.get("/movie/json", getMovie);
router.post("/movie/json", postMovie);
router.get("/movies/json", getMovies);

/** HEALTH */
//: --------------------------------------------------------
router.get("/health", (
    req: Request, res: Response) => {
    log("health");
    res.status(200).type("text").send("ツ");
});

/** TEST (next) ERROR */
//: --------------------------------------------------------
router.get("/err", (
    req: Request, res: Response, next: NextFunction) => {
    log("error");
    try {
        throw Error("TEST (next) ERROR");
    } catch (err) {
        next(err);
    }
});

//: ----------------------------------------------------------------------------
export default router;
